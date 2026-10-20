/**
 * Typed access to the generated catalogue.
 *
 * `data/products.json` is written by `pnpm --filter @xsin/content collect`
 * (and copied to `apps/web/src/generated/products.json`). Run it whenever a
 * product README changes; the committed file is the build-time source of truth.
 */
import rawProducts from '../data/products.json' with { type: 'json' };

import type { Locale, Product, ProductCopy, Products } from './schema.ts';

export type {
  CollectedFacts,
  ContentConfig,
  FactKey,
  Feature,
  Locale,
  Product,
  ProductConfig,
  ProductCopy,
  ProductFacts,
  ProductLinks,
  ProductOverride,
  ProductSource,
  Products,
  SpecRow,
} from './schema.ts';
export { describeSource, locales, productSchema, productsSchema } from './schema.ts';

/**
 * Every product, in display order. The JSON is written by `collect`, which
 * validates it with the same schema as `productsSchema`, so the cast only
 * narrows the widened JSON literal types (tuple → array).
 */
export const products: Products = rawProducts as unknown as Products;

/** One product by slug, or `undefined`. */
export const getProduct = (slug: string): Product | undefined => products.find((product) => product.slug === slug);

/** Copy for one locale. */
export const getProductCopy = (slug: string, locale: Locale): ProductCopy | undefined => getProduct(slug)?.[locale];
