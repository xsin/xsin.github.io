import { z } from 'zod';

/* -------------------------------------------------------------------------- */
/* Primitives                                                                  */
/* -------------------------------------------------------------------------- */

export const localeSchema = z.enum(['en', 'zh']);
export type Locale = z.infer<typeof localeSchema>;

export const locales = localeSchema.options satisfies readonly Locale[];

/** Where the facts for a product come from. */
export const sourceSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('github'), repo: z.string().regex(/^[\w.-]+\/[\w.-]+$/, 'expected `owner/name`') }),
  z
    .object({ kind: z.literal('url'), url: z.url() })
    .refine(({ url }) => /^https?:\/\//i.test(url), { message: 'expected an http(s) URL', path: ['url'] }),
  z.object({ kind: z.literal('file'), path: z.string().min(1) }),
]);
export type ProductSource = z.infer<typeof sourceSchema>;

/** Human-readable source, e.g. `github:xsin/ai-bobby`. */
export const describeSource = (source: ProductSource): string =>
  source.kind === 'github' ? `github:${source.repo}` : source.kind === 'url' ? `url:${source.url}` : `file:${source.path}`;

/* -------------------------------------------------------------------------- */
/* ProductCopy — editorial copy, one object per locale                         */
/* -------------------------------------------------------------------------- */

const text = z.string().min(1).trim();
/** Fields the app renders as HTML (`<br>`, `<em>`). */
const html = z.string().min(1).trim();

export const featureSchema = z.object({ title: text, body: text });
export type Feature = z.infer<typeof featureSchema>;

export const specRowSchema = z.object({ label: text, value: text });
export type SpecRow = z.infer<typeof specRowSchema>;

export const productCopySchema = z.object({
  /** Release state, e.g. `v0.2.3 · INTERNAL BETA`. */
  status: text,
  /** Kicker, e.g. `LOCAL AI GATEWAY / MACOS`. */
  category: text,
  /** Inline tagline, e.g. `The musician’s toolbox.` */
  tagline: text,
  /** Headline; may contain inline HTML (`<br>`, `<em>`). */
  title: html,
  /** Full paragraph for the dossier. */
  body: text,
  /** Short paragraph for the product card. */
  cardBody: text,
  /** Exactly four feature rows, rendered in order. */
  features: z.tuple([featureSchema, featureSchema, featureSchema, featureSchema]),
  /** Exactly three chips rendered over the instrument. */
  chips: z.tuple([text, text, text]),
  /** Instrument footer, e.g. `OPENAI-COMPATIBLE`. */
  foot: text,
  /** Footnote about pre-release state; safe to hide on small screens. */
  note: text,
  /** Spec-sheet rows for the dossier dialog. */
  spec: z.array(specRowSchema).min(1),
});
export type ProductCopy = z.infer<typeof productCopySchema>;

/* -------------------------------------------------------------------------- */
/* ProductFacts — collected at build time, never hand-written                  */
/* -------------------------------------------------------------------------- */

export const README_EXCERPT_MAX = 360;

/** Order in which a product's facts keys are written to JSON. */
export const factKeys = [
  /** Manual pin; written first so it is visible at a glance. */
  'latestVersion',
  'owner',
  'repo',
  'description',
  'homepage',
  'license',
  'stars',
  'readmeExcerpt',
] as const;
export type FactKey = (typeof factKeys)[number];

/** A fact read from a collector before it is validated. */
export type CollectedFacts = { [K in FactKey]?: string | number | null };

export const factsSchema = z.object({
  /** GitHub owner / org. */
  owner: z.string().min(1).optional(),
  /** GitHub repository name. */
  repo: z.string().min(1).optional(),
  /** Repository or page description (one line). */
  description: text.optional(),
  /** Project homepage. */
  homepage: z.url().optional(),
  /** SPDX identifier when the source exposes one, else the license name. */
  license: text.optional(),
  /** GitHub stargazers, an integer ≥ 0. */
  stars: z.number().int().nonnegative().optional(),
  /** First meaningful README paragraph, markdown stripped. */
  readmeExcerpt: z.string().min(1).max(README_EXCERPT_MAX).optional(),
  /** `MAJOR.MINOR.PATCH`, discovered from the README status block. */
  latestVersion: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/)
    .optional(),
});
export type ProductFacts = z.infer<typeof factsSchema>;

/* -------------------------------------------------------------------------- */
/* Product — the merged output                                                 */
/* -------------------------------------------------------------------------- */

export const productLinksSchema = z.object({
  github: z.url(),
  releases: z.url(),
  website: z.url(),
  install: text,
});
export type ProductLinks = z.infer<typeof productLinksSchema>;

export const productSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  /** Display order on the site, starting at 1. */
  index: z.number().int().positive(),
  name: text,
  /** Two-letter monogram. */
  mark: z.string().min(1).max(3),
  /** Primary brand colour, `#RGB` or `#RRGGBB`. */
  color: z.string().regex(/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/),
  /** Secondary brand colour used by the gradients. */
  color2: z.string().regex(/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/),
  links: productLinksSchema,
  facts: factsSchema,
  en: productCopySchema,
  zh: productCopySchema,
  /** Where `facts` came from. */
  source: sourceSchema,
});
export type Product = z.infer<typeof productSchema>;

/** Order in which a product's top-level keys are written to JSON. */
export const productKeys = [
  'slug',
  'index',
  'name',
  'mark',
  'color',
  'color2',
  'links',
  'facts',
  'en',
  'zh',
  'source',
] as const;

export const productsSchema = z.array(productSchema).min(1);
export type Products = readonly Product[];

/* -------------------------------------------------------------------------- */
/* Content config + overrides                                                  */
/* -------------------------------------------------------------------------- */

/** Paths are relative to `packages/content/`. */
export const productConfigSchema = z.strictObject({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  source: sourceSchema,
  /** Editorial copy merged on top of `snapshots/<slug>.md`. */
  overrides: z.string().min(1),
  /** Committed README copy used offline and as a network fallback. */
  snapshot: z.string().min(1),
});
export type ProductConfig = z.infer<typeof productConfigSchema>;

export const contentConfigSchema = z
  // Strict: a misspelt key (`snapshots:` for `snapshot:`) must fail loudly.
  .strictObject({
    $schema: z.string().optional(),
    products: z.array(productConfigSchema).min(1),
  })
  .superRefine(({ products }, ctx) => {
    const seen = new Set<string>();
    for (const [position, product] of products.entries()) {
      if (seen.has(product.slug)) {
        ctx.addIssue({ code: 'custom', message: `duplicate slug \`${product.slug}\``, path: ['products', position, 'slug'] });
      }
      seen.add(product.slug);
    }
  });
export type ContentConfig = z.infer<typeof contentConfigSchema>;

/* --- Editorial overrides --------------------------------------------------- */

/** Placeholder written when an override is missing; `collect` reports it. */
export const PENDING = '—';

/**
 * One editorial string. A missing or mistyped value becomes a sentinel that
 * still satisfies the final schema, so a typo in one field degrades that field
 * instead of failing the whole build; `collect` reports every sentinel it finds.
 */
const editable = (name: string) => text.default(PENDING).catch(`<invalid ${name}>`);

const overrideFeatureSchema = z.object({
  title: editable('features.title'),
  body: editable('features.body'),
});

const overrideCopySchema = z.looseObject({
  status: editable('status'),
  category: editable('category'),
  tagline: editable('tagline'),
  title: html.default(PENDING).catch('<invalid title>'),
  body: editable('body'),
  features: z
    .array(overrideFeatureSchema)
    .length(4, 'expected exactly four features')
    .catch([1, 2, 3, 4].map(() => ({ title: PENDING, body: PENDING }))),
  chips: z.array(text).length(3, 'expected exactly three chips').catch([PENDING, PENDING, PENDING]),
  foot: editable('foot'),
  note: editable('note'),
  /** `Label: value`, written as an ordered object for diffable JSON. */
  spec: z
    .record(z.string().min(1), z.string().min(1))
    .transform((rows) => Object.entries(rows).map(([label, value]) => ({ label, value })))
    .catch([]),
});

export const factsPinSchema = z.strictObject({
  /** Pinned when the README no longer states the release this site covers. */
  latestVersion: productSchema.shape.facts.shape.latestVersion.optional(),
});
export type FactsPin = z.infer<typeof factsPinSchema>;

/**
 * Editorial overrides, merged over the committed snapshot. Unknown keys at the
 * top level are rejected so retired fields are noticed; locale objects are
 * loose because the prototype managed extra copy there (e.g. `dialogDesc`).
 */
export const overrideSchema = z.strictObject({
  index: z.number().int().positive().optional(),
  name: text.optional(),
  mark: z.string().min(1).max(3).optional(),
  color: productSchema.shape.color.optional(),
  color2: productSchema.shape.color2.optional(),
  /** Only the links the prototype declares; defaults are derived from the source. */
  links: productLinksSchema.partial().optional(),
  facts: factsPinSchema.optional(),
  en: overrideCopySchema,
  zh: overrideCopySchema,
});
export type ProductOverride = z.infer<typeof overrideSchema>;

/** True for values produced by `editable` after a missing or invalid input. */
export const isOverrideSentinel = (value: unknown): boolean =>
  typeof value === 'string' && (value === PENDING || value.startsWith('<invalid '));
