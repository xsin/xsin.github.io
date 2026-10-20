/**
 * Build-time product data collection.
 *
 *   pnpm --filter @xsin/content collect [--offline] [--check]
 *
 * Reads `content.config.json` and the editorial overrides, collects facts from
 * each product's source (GitHub REST + raw README, a web page, or a local file),
 * and writes the merged, schema-validated catalogue to `data/products.json` and
 * `apps/web/src/generated/products.json`.
 *
 * `--offline` (or CONTENT_OFFLINE=1) reads only the committed README snapshots.
 * `--check` validates and diffs without writing; it exits 1 if files are stale.
 *
 * Output is deterministic: no timestamps, stable key order, 2-space JSON, a
 * trailing newline. On any failure the existing files are left untouched.
 */
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { z } from 'zod';

import { collectFacts, type CollectResult, extractVersion } from './collectors.ts';
import {
  type CollectedFacts,
  contentConfigSchema,
  describeSource,
  factKeys,
  isOverrideSentinel,
  overrideSchema,
  type Product,
  type ProductConfig,
  type ProductFacts,
  type ProductOverride,
  type Products,
  productsSchema,
  productKeys,
} from './schema.ts';

/* -------------------------------------------------------------------------- */
/* Paths + arguments                                                          */
/* -------------------------------------------------------------------------- */

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(packageRoot, '../..');
const configFile = join(packageRoot, 'content.config.json');
const dataFile = join(packageRoot, 'data/products.json');
const generatedFile = join(workspaceRoot, 'apps/web/src/generated/products.json');

const fallbackColor = '#888888';

/** Links derived from a source when the override does not supply one. */
const applyLinkDefaults = (
  slug: string,
  source: ProductConfig['source'],
  links: ProductOverride['links'] | undefined,
): Product['links'] | undefined => {
  if (source.kind === 'github') {
    const url = `https://github.com/${source.repo}`;
    // The site lives at <owner>.github.io/<repo>/ on GitHub Pages.
    const website = `https://${source.repo.split('/')[0]?.toLowerCase()}.github.io/${slug}/`;
    return { github: links?.github ?? url, releases: links?.releases ?? `${url}/releases`, website: links?.website ?? website, install: links?.install ?? '' };
  }
  return undefined;
};

/* -------------------------------------------------------------------------- */
/* Deterministic merge                                                        */
/* -------------------------------------------------------------------------- */

/** Facts in `factKeys` order, with an override pin replacing the discovered version. */
const orderedFacts = (facts: CollectedFacts, pin: string | undefined): ProductFacts => {
  const merged: Record<string, string | number | null | undefined> = { ...facts };
  if (pin) merged.latestVersion = pin;
  const ordered: Record<string, unknown> = {};
  for (const key of factKeys) {
    const value = merged[key];
    if (typeof value === 'number' || (typeof value === 'string' && value.trim() !== '')) ordered[key] = value;
  }
  return ordered as ProductFacts;
};

const orderedProduct = (product: Record<string, unknown>): Product => {
  const ordered: Record<string, unknown> = {};
  for (const key of productKeys) ordered[key] = product[key];
  const links = ordered.links as Record<string, unknown>;
  ordered.links = { github: links.github, releases: links.releases, website: links.website, install: links.install };
  return ordered as Product;
};

const buildProduct = (config: ProductConfig, override: ProductOverride, facts: CollectedFacts): Product => {
  const pin = override.facts?.latestVersion;
  const links = applyLinkDefaults(config.slug, config.source, override.links) ?? {
    github: 'https://github.com/',
    releases: 'https://github.com/',
    website: 'https://xsin.github.io/',
    install: '',
  };
  return orderedProduct({
    slug: config.slug,
    index: override.index ?? 0,
    name: override.name ?? config.slug,
    mark: override.mark ?? config.slug.slice(0, 2).toUpperCase(),
    color: override.color ?? fallbackColor,
    color2: override.color2 ?? override.color ?? fallbackColor,
    links,
    facts: orderedFacts(facts, pin),
    en: override.en,
    zh: override.zh,
    source: config.source,
  });
};

const serialise = (products: Products): string => `${JSON.stringify(products, null, 2)}\n`;

/* -------------------------------------------------------------------------- */
/* Reporting                                                                  */
/* -------------------------------------------------------------------------- */

/** Every `—` / `<invalid …>` sentinel left in the copy, as `en.features.2.title`. */
const findSentinels = (product: Product): string[] => {
  const paths: string[] = [];
  const walk = (value: unknown, path: string): void => {
    if (isOverrideSentinel(value)) paths.push(path);
    else if (Array.isArray(value)) value.forEach((item, index) => walk(item, `${path}.${index + 1}`));
    else if (value && typeof value === 'object') {
      for (const [key, child] of Object.entries(value)) walk(child, path ? `${path}.${key}` : key);
    }
  };
  walk({ en: product.en, zh: product.zh }, '');
  return paths;
};

const relativeToPackage = (file: string): string => relative(packageRoot, file) || '.';

interface FormatError {
  path: string;
  message: string;
}

const formatIssues = (error: z.ZodError): FormatError[] =>
  error.issues.map((issue) => ({ path: issue.path.join('.') || '(root)', message: issue.message }));

/** A schema failure in a config/override file, with the file it came from. */
class ConfigError extends Error {
  readonly issues: string;

  constructor(file: string, error: z.ZodError) {
    super(`${relativeToPackage(file)} failed validation`);
    this.issues = z.prettifyError(error);
  }
}

const parseFile = <T>(schema: z.ZodType<T>, value: unknown, file: string): T => {
  const parsed = schema.safeParse(value);
  if (!parsed.success) throw new ConfigError(file, parsed.error);
  return parsed.data;
};

/* -------------------------------------------------------------------------- */
/* Main                                                                       */
/* -------------------------------------------------------------------------- */

export interface CollectOptions {
  offline: boolean;
}

export interface CollectSummary {
  products: Products;
  offline: boolean;
  notes: string[];
  /** Files whose content changed (or would change, with --check). */
  changed: string[];
  /** Set when validation failed; nothing was written. */
  errors?: FormatError[];
}

const readJson = async (file: string, what = relativeToPackage(file)): Promise<unknown> => {
  let raw: string;
  try {
    raw = await readFile(file, 'utf8');
  } catch {
    throw new Error(`cannot read ${what} (${relativeToPackage(file)})`);
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`invalid JSON in ${relativeToPackage(file)}: ${error instanceof Error ? error.message : String(error)}`);
  }
};

const readText = async (file: string): Promise<string | undefined> =>
  existsSync(file) ? readFile(file, 'utf8') : undefined;

/** Run the whole pipeline in memory; never writes. */
export const collect = async (options: CollectOptions): Promise<CollectSummary> => {
  const notes: string[] = [];
  const config = parseFile(contentConfigSchema, await readJson(configFile), configFile);

  const products: Product[] = [];
  for (const productConfig of config.products) {
    const overrideFile = resolve(packageRoot, productConfig.overrides);
    const snapshotFile = resolve(packageRoot, productConfig.snapshot);
    const override = parseFile(overrideSchema, await readJson(overrideFile, `${productConfig.slug} overrides`), overrideFile);
    const snapshot = await readText(snapshotFile);
    if (snapshot === undefined) notes.push(`${productConfig.slug}: snapshot ${relativeToPackage(snapshotFile)} missing`);

    const result: CollectResult = await collectFacts(productConfig.source, {
      offline: options.offline,
      token: process.env.GITHUB_TOKEN,
      root: packageRoot,
      fallback: snapshot,
    });
    if (result.note && result.note !== 'offline') notes.push(`${productConfig.slug}: ${result.note}`);
    if (result.missing.length > 0) notes.push(`${productConfig.slug}: live source did not produce ${result.missing.join(', ')}`);

    const product = buildProduct(productConfig, override, result.facts);
    const facts = product.facts;
    const label = `${product.name} (${describeSource(productConfig.source)})`;
    const pin = override.facts?.latestVersion;
    const excerpt = facts.readmeExcerpt ? 'readme' : 'no readme';
    const versionSource = pin
      ? 'pinned'
      : extractVersion({ readme: result.readme ?? snapshot ?? '' }).from === 'status'
        ? 'from README status'
        : 'from README head';
    const factsLine = options.offline
      ? ['facts skipped', `${facts.latestVersion ? `v${facts.latestVersion} (${versionSource})` : 'no version'}`, excerpt]
      : [
          facts.latestVersion ? `v${facts.latestVersion} (${versionSource})` : `version n/a (${versionSource})`,
          facts.stars === undefined ? undefined : `${facts.stars}★`,
          facts.license ?? 'license n/a',
          `${excerpt}${result.note ? ' (snapshot)' : ''}`,
        ].filter(Boolean);
    notes.push(`${label}: ${factsLine.join(' · ')}`);
    products.push(product);
  }

  const parsed = productsSchema.safeParse(products);
  if (!parsed.success) return { products, offline: options.offline, notes, changed: [], errors: formatIssues(parsed.error) };

  const html = serialise(parsed.data);
  const changed: string[] = [];
  for (const file of [dataFile, generatedFile]) {
    const current = await readText(file);
    if (current !== html) changed.push(file);
  }
  return { products: parsed.data, offline: options.offline, notes, changed };
};

export const writeProducts = async (summary: CollectSummary): Promise<void> => {
  const json = serialise(summary.products);
  for (const file of summary.changed) {
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, json, 'utf8');
  }
};

const printSummary = (summary: CollectSummary): void => {
  const mode = summary.offline ? 'offline (snapshots)' : 'online';
  console.log(`@xsin/content · ${summary.products.length} products · ${mode}`);
  for (const note of summary.notes) console.log(`  ${note}`);

  for (const product of summary.products) {
    const sentinels = findSentinels(product);
    if (sentinels.length > 0) {
      console.warn(`  ⚠ ${product.slug}: ${sentinels.length} override placeholder(s): ${sentinels.join(', ')}`);
    }
  }
  if (summary.changed.length === 0) {
    console.log('  output unchanged');
    return;
  }
  const kilobytes = (Buffer.byteLength(serialise(summary.products)) / 1024).toFixed(1);
  for (const file of summary.changed) console.log(`  wrote ${relativeToPackage(file)} (${kilobytes} kB)`);
};

const main = async (argv: string[]): Promise<number> => {
  const offline = argv.includes('--offline') || process.env.CONTENT_OFFLINE === '1';
  const check = argv.includes('--check');

  let summary: CollectSummary;
  try {
    summary = await collect({ offline });
  } catch (error) {
    if (error instanceof ConfigError) {
      console.error(`✗ ${error.message}; nothing written`);
      for (const line of error.issues.split('\n')) console.error(`  ${line}`);
    } else {
      console.error(`✗ ${error instanceof Error ? error.message : String(error)}`);
    }
    return 1;
  }

  if (summary.errors) {
    console.error('✗ products.json failed validation; nothing written');
    for (const { path, message } of summary.errors) console.error(`  ${path}: ${message}`);
    return 1;
  }

  printSummary(summary);
  if (check) {
    if (summary.changed.length > 0) {
      console.error(`✗ stale: ${summary.changed.map(relativeToPackage).join(', ')} — run \`pnpm --filter @xsin/content collect\``);
      return 1;
    }
    console.log('✓ up to date');
    return 0;
  }

  await writeProducts(summary);
  return 0;
};

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main(process.argv.slice(2)).then(
    (code) => {
      process.exitCode = code;
    },
    (error: unknown) => {
      console.error(error);
      process.exitCode = 1;
    },
  );
}
