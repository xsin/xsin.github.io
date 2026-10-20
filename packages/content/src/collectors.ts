import { readFile } from 'node:fs/promises';

import type { CollectedFacts, ProductSource } from './schema.ts';
import { README_EXCERPT_MAX } from './schema.ts';

/* -------------------------------------------------------------------------- */
/* Text helpers                                                                */
/* -------------------------------------------------------------------------- */

/** Collapse every run of whitespace (including CJK line breaks) into one space. */
export const oneLine = (value: string): string => value.replace(/\s+/gu, ' ').trim();

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  apos: "'",
  gt: '>',
  hellip: '…',
  lt: '<',
  nbsp: ' ',
  mdash: '—',
  ndash: '–',
  quot: '"',
  '#039': "'",
  rsquo: '\u2019',
  lsquo: '\u2018',
  rdquo: '\u201d',
  ldquo: '\u201c',
};

/** Decode the HTML entities that appear in titles and meta descriptions. */
export const decodeEntities = (value: string): string =>
  value.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/giu, (match, entity: string) => {
    if (entity.startsWith('#x') || entity.startsWith('#X')) {
      return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith('#')) return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
  });

/** Remove HTML tags, keeping `<br>` as a space, and decode entities. */
export const stripHtml = (html: string): string =>
  decodeEntities(html.replace(/<br\s*\/?>/giu, ' ').replace(/<[^>]+>/gu, ' '));

const inlineMarkdown = (value: string): string =>
  value
    .replace(/!\[([^\]]*)\]\([^)]*\)/gu, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/gu, '$1')
    .replace(/\[([^\]]*)\]\[[^\]]*\]/gu, '$1')
    .replace(/`([^`]*)`/gu, '$1')
    .replace(/(\*\*|__|\*|_|~~)(?=\S)(.*?)(?<=\S)\1/gu, '$2')
    .replace(/<[^>]+>/gu, ' ')
    .replace(/\\([\\`*_{}[\]()#+\-.!|])/gu, '$1');

/**
 * Strip Markdown to readable text: labels, links, emphasis, code, quotes.
 * Image-only lines and separators become empty strings.
 */
export const stripMarkdown = (markdown: string): string =>
  oneLine(
    markdown
      .split('\n')
      .map((line) =>
        line
          .replace(/^\s*(?:>\s?)+/u, '')
          .replace(/^\s{0,3}#{1,6}\s+/u, '')
          .replace(/^\s{0,3}[-*+]\s+/u, '')
          .replace(/^\s{0,3}\d+[.)]\s+/u, '')
          .replace(/\|/gu, ' '),
      )
      .filter((line) => !/^\s*(?:[-*_=]{3,}\s*|[-:| ]+)?$/u.test(line))
      .map(inlineMarkdown)
      .filter((line) => line.trim() !== '')
      .join(' '),
  );

/** Cut at a word boundary (or code point) within `max` characters. */
export const truncate = (value: string, max = README_EXCERPT_MAX): string => {
  if (value.length <= max) return value;
  const slice = Array.from(value).slice(0, max).join('');
  const cut = slice.lastIndexOf(' ');
  return `${(cut > max * 0.6 ? slice.slice(0, cut) : slice).replace(/[\s,;:.–—-]+$/u, '')}…`;
};

/* -------------------------------------------------------------------------- */
/* Excerpt + version extraction                                               */
/* -------------------------------------------------------------------------- */

/** fenced code, display math and HTML comments are not prose. */
const stripBlocks = (markdown: string): string =>
  markdown
    .replace(/<!--[\s\S]*?-->/gu, '')
    .replace(/^( {0,3})(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\2[^\n]*$/gmu, '')
    .replace(/^\s*\$\$[\s\S]*?^\s*\$\$\s*$/gmu, '');

const STRUCTURAL_LINE =
  /^\s*(?:#{1,6}(?:\s|$)|>|[-*+]\s|\d+[.)]\s|\||<|!\[|\[!|```|~~~|\$\$|(?:[-*_]\s*){3,}$)/u;

/** A line of prose: not a heading/list/table/code/HTML/emoji-badge line. */
const isProseLine = (line: string): boolean => {
  const trimmed = line.trim();
  return trimmed !== '' && !STRUCTURAL_LINE.test(trimmed) && /[\p{L}\p{N}]/u.test(trimmed);
};

/**
 * First meaningful paragraph of a README, markdown stripped.
 *
 * Skips the title, badges, blockquote status blocks, labels ("English ·
 * 简体中文") and short tagline lines that introduce the real summary, so both
 * an English README (title → tagline → intro) and a Chinese one (title → label
 * → blockquote status → intro) yield a description paragraph. Code is ignored.
 */
export const extractExcerpt = (markdown: string, max = README_EXCERPT_MAX): string | undefined => {
  const lines = stripBlocks(markdown).split('\n');
  const start = lines.findIndex((line) => /^#\s+\S/u.test(line));
  const candidates = (start === -1 ? lines : lines.slice(start + 1)).filter(isProseLine);

  // Prefer the first paragraph with a little substance; fall back to any prose.
  for (const minimum of [40, 0]) {
    for (const line of candidates) {
      const text = stripMarkdown(line);
      if (text.length >= minimum) return truncate(text, max);
    }
  }
  return undefined;
};

export interface VersionInput {
  /** The README or page the version is read from. */
  readme: string;
    /** Manual pin from overrides; wins over discovered versions. */
  override?: string;
}

const VERSION_PATTERN = /(?<![\w.])v?(\d+\.\d+\.\d+)(?![\w.])/gu;
const RELEASE_CONTEXT = /\b(?:status|released?|release|public beta|latest|version)\b|状态|发布|公测|beta/iu;
const PRERELEASE_CONTEXT = /internal|preview|\bnext\b|unreleased|内测|预览|未发布|尚未发布/iu;

const versionsIn = (text: string): string[] =>
  [...text.matchAll(VERSION_PATTERN)].flatMap((match) => (match[1] ? [match[1]] : []));

const splitSentences = (line: string): string[] => {
  const sentences: string[] = [];
  let current = '';
  for (const char of line) {
    current += char;
    if ('。！？!?'.includes(char) || (char === '.' && !/\d$/u.test(current.slice(0, -1)))) {
      sentences.push(current);
      current = '';
    }
  }
  if (current.trim() !== '') sentences.push(current);
  return sentences;
};

export interface VersionResult {
  version?: string;
  /** Where the version was found, for the summary. */
  from?: 'status' | 'head' | 'override';
  /** Why no version was reported, for the summary. */
  reason?: 'no-version';
}

/**
 * The newest `MAJOR.MINOR.PATCH` mentioned around the README status / first 80
 * lines, ignoring versions that only appear as a "still in preview" aside.
 */
export const extractVersion = ({ readme, override }: VersionInput): VersionResult => {
  if (override) return { version: override, from: 'override' };

  const lines = readme.split('\n');
  const statusStart = lines.findIndex((line) => RELEASE_CONTEXT.test(line));
  // The status block wins; the head of the README is only a fallback. Other
  // sections (development, changelog) describe old releases, so never scan past them.
  const windows = statusStart === -1 ? [[0, 80] as const] : [[statusStart, statusStart + 10] as const];

  for (const [index, [from, to]] of windows.entries()) {
    const source = statusStart === -1 || index > 0 ? 'head' : 'status';
    const window = lines.slice(from, to);
    if (!window.some((line) => versionsIn(line).length > 0)) continue;
    // Prefer the first version whose sentence is not a pre-release aside.
    for (const line of window) {
      for (const sentence of splitSentences(line)) {
        if (PRERELEASE_CONTEXT.test(sentence)) continue;
        const version = versionsIn(sentence)[0];
        if (version) return { version, from: source };
      }
    }
    const first = window.flatMap(versionsIn)[0];
    if (first) return { version: first, from: source };
  }
  return { reason: 'no-version' };
};

/* -------------------------------------------------------------------------- */
/* Collectors                                                                 */
/* -------------------------------------------------------------------------- */

export interface CollectorOptions {
  offline: boolean;
  /** `GITHUB_TOKEN`, if set. */
  token?: string;
  /** Timeout for a single request. */
  timeoutMs?: number;
  /** Absolute path used to resolve `kind: 'file'` sources. */
  root: string;
  /** Page text fallback (snapshot) used when the network fails. */
  fallback?: string;
}

export interface CollectResult {
  facts: CollectedFacts;
  /** The README or page text the facts were read from, for reporting. */
  readme?: string;
  /** Number of facts that came from the live source (not the snapshot). */
  live: number;
  /** Inputs the collector could not read; they are simply absent from `facts`. */
  missing: string[];
  /** Short human note for the summary, e.g. `github 403 → snapshot`. */
  note?: string;
}

const fetchText = async (url: string, options: CollectorOptions, headers: Record<string, string> = {}): Promise<string> => {
  const response = await fetch(url, {
    headers: { accept: '*/*', 'user-agent': 'xsin-studio-content', ...headers },
    signal: AbortSignal.timeout(options.timeoutMs ?? 10_000),
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.text();
};

/** GitHub's repo fields that become facts, validated loosely (the API may add fields). */
interface GitHubRepoJson {
  owner?: { login?: string };
  name?: string;
  description?: string | null;
  homepage?: string | null;
  license?: { spdx_id?: string | null; name?: string | null } | null;
  stargazers_count?: number;
}

const isHttps = (value: string | null | undefined): value is string => typeof value === 'string' && /^https?:\/\//u.test(value);

/** Drop empty strings and nulls so absent facts are simply absent. */
const compact = (facts: Record<string, string | number | null | undefined>): CollectedFacts => {
  const result: CollectedFacts = {};
  for (const [key, value] of Object.entries(facts)) {
    if (typeof value === 'number' && Number.isFinite(value)) (result as Record<string, unknown>)[key] = value;
    else if (typeof value === 'string' && value.trim() !== '') (result as Record<string, unknown>)[key] = oneLine(value);
  }
  return result;
};

/** A source that failed outright; the snapshot then supplies what it can. */
class SourceError extends Error {}

const collectGithub = async (repo: string, options: CollectorOptions): Promise<CollectResult> => {
  type Api = { ok: true; value: GitHubRepoJson } | { ok: false; reason: string };
  type Readme = { ok: true; value: string } | { ok: false; reason: string };

  const apiHeaders: Record<string, string> = { accept: 'application/vnd.github+json', 'x-github-api-version': '2022-11-28' };
  if (options.token) apiHeaders.authorization = `Bearer ${options.token}`;

  // Both requests run even if one fails: a rate-limited API should not hide
  // the README, and a missing README should not hide the metadata.
  const [api, readme] = await Promise.all([
    fetchText(`https://api.github.com/repos/${repo}`, options, apiHeaders).then(
      (text): Api => {
        try {
          return { ok: true, value: JSON.parse(text) as GitHubRepoJson };
        } catch {
          return { ok: false, reason: 'API: invalid JSON' };
        }
      },
      (error: unknown): Api => ({ ok: false, reason: `API: ${error instanceof Error ? error.message : String(error)}` }),
    ),
    fetchText(`https://raw.githubusercontent.com/${repo}/HEAD/README.md`, options).then(
      (value): Readme => ({ ok: true, value }),
      (error: unknown): Readme => ({ ok: false, reason: `README: ${error instanceof Error ? error.message : String(error)}` }),
    ),
  ]);

  if (!api.ok && !readme.ok) throw new SourceError([api.reason, readme.reason].join('; '));
  const meta = api.ok ? api.value : {};

  const facts = compact({
    owner: meta.owner?.login,
    repo: meta.name,
    description: meta.description,
    homepage: isHttps(meta.homepage) ? meta.homepage : undefined,
    license: meta.license?.spdx_id ?? meta.license?.name,
    stars: meta.stargazers_count,
    readmeExcerpt: readme.ok ? extractExcerpt(readme.value) : undefined,
    latestVersion: readme.ok ? extractVersion({ readme: readme.value }).version : undefined,
  });
  return { facts, readme: readme.ok ? readme.value : undefined, live: Object.keys(facts).length, missing: [] };
};

const collectUrl = async (url: string, options: CollectorOptions): Promise<CollectResult> => {
  const html = await fetchText(url, options).catch((error: unknown) => {
    throw new SourceError(error instanceof Error ? error.message : String(error));
  });
  const meta = (name: string): string | undefined => {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
    const patterns = [
      new RegExp(`<meta\\s+[^>]*?(?:name|property)=["']${escaped}["'][^>]*?content=["']([^"']*)["']`, 'iu'),
      new RegExp(`<meta\\s+[^>]*?content=["']([^"']*)["'][^>]*?(?:name|property)=["']${escaped}["']`, 'iu'),
    ];
    for (const pattern of patterns) {
      const content = html.match(pattern)?.[1];
      if (content) return oneLine(decodeEntities(content));
    }
    return undefined;
  };
  const heading = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/iu)?.[1];
  const titleTag = html.match(/<title[^>]*>([\s\S]*?)<\/title>/iu)?.[1];

  const description = meta('description') ?? meta('og:description') ?? (heading ? oneLine(stripHtml(heading)) : undefined);
  const pageTitle = meta('og:title') ?? (titleTag ? oneLine(stripHtml(titleTag)) : undefined);
  const paragraph = meta('og:description') ?? meta('description') ?? description;
  const latestVersion = extractVersion({ readme: html.split('\n').slice(0, 80).join('\n') }).version;

  const facts = compact({ description, readmeExcerpt: paragraph, latestVersion });
  const live = [description, pageTitle, paragraph, latestVersion].filter(Boolean).length;
  return { facts, readme: html, live, missing: [] };
};

const collectFile = async (path: string, options: CollectorOptions): Promise<CollectResult> => {
  const file = new URL(path, `file://${options.root.endsWith('/') ? options.root : `${options.root}/`}`);
  const content = await readFile(file, 'utf8').catch((error: unknown) => {
    throw new SourceError(error instanceof Error ? error.message : String(error));
  });
  const excerpt = extractExcerpt(content);
  const heading = content.match(/^#\s+(.+)$/mu)?.[1];
  const facts = compact({
    // The page's own title stands in for a description.
    description: heading ? stripMarkdown(heading) : excerpt,
    readmeExcerpt: excerpt,
    latestVersion: extractVersion({ readme: content }).version,
  });
  return { facts, readme: content, live: Object.keys(facts).length, missing: [] };
};

const snapshotFacts = (text: string): CollectedFacts =>
  compact({ readmeExcerpt: extractExcerpt(text), latestVersion: extractVersion({ readme: text }).version });

/**
 * Collect facts for one source. Never throws: on any failure the committed
 * snapshot supplies `readmeExcerpt` / `latestVersion`, everything else is absent.
 */
export const collectFacts = async (source: ProductSource, options: CollectorOptions): Promise<CollectResult> => {
  if (options.offline) {
    return {
      facts: options.fallback === undefined ? {} : snapshotFacts(options.fallback),
      readme: options.fallback,
      live: 0,
      missing: [],
      note: 'offline',
    };
  }

  try {
    const result =
      source.kind === 'github'
        ? await collectGithub(source.repo, options)
        : source.kind === 'url'
          ? await collectUrl(source.url, options)
          : await collectFile(source.path, options);
    const missing = (['readmeExcerpt', 'latestVersion'] as const).filter((key) => result.facts[key] === undefined);
    return { ...result, missing };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    const facts = options.fallback === undefined ? {} : snapshotFacts(options.fallback);
    return { facts, readme: options.fallback, live: 0, missing: [], note: `network failed (${reason}) → snapshot` };
  }
};
