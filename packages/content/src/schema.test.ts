import { describe, expect, it } from 'vitest';
import { getProduct, products } from './index.ts';
import { productsSchema } from './schema.ts';

describe('generated product catalogue', () => {
  it('validates against the schema', () => {
    const parsed = productsSchema.parse(products);
    expect(parsed).toHaveLength(2);
  });

  it('keeps the approved release status and NVIDIA copy', () => {
    const bobby = getProduct('ai-bobby');
    expect(bobby?.en.status).toBe('v0.2.3 · INTERNAL BETA');
    expect(bobby?.en.body).toContain('free-tier pools');
    expect(bobby?.en.body).toContain('NVIDIA');
    expect(bobby?.en.body).toContain('more on the way');
    expect(bobby?.en.chips[0]).toBe('MULTI-SOURCE');
    expect(bobby?.en.spec.some((row) => row.label === 'Sources' && row.value.includes('NVIDIA'))).toBe(true);
    expect(bobby?.facts.latestVersion).toBe('0.2.3');
  });

  it('keeps O Muse on its public beta', () => {
    const muse = getProduct('o-muse');
    expect(muse?.en.status).toBe('v0.2.2 · PUBLIC BETA');
    expect(muse?.en.features).toHaveLength(4);
    expect(muse?.facts.latestVersion).toBe('0.2.2');
  });
});
