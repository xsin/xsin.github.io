import { describe, expect, it } from 'vitest';
import { COPY } from './copy';

describe('copy', () => {
  it('has the same keys in English and Chinese', () => {
    expect(Object.keys(COPY.zh).sort()).toEqual(Object.keys(COPY.en).sort());
  });

  it('has no empty strings', () => {
    for (const locale of ['en', 'zh'] as const) {
      for (const [key, value] of Object.entries(COPY[locale])) {
        expect(value.trim(), `${locale}.${key}`).not.toBe('');
      }
    }
  });

  it('keeps the open-ended AI Bobby model-pool copy', () => {
    for (const locale of ['en', 'zh'] as const) {
      const body = COPY[locale]['p.bobby.body'];
      expect(body).toContain('NVIDIA');
      expect(body).toMatch(locale === 'en' ? /free-tier pools/ : /免费额度/);
      expect(body).toMatch(locale === 'en' ? /more on the way/ : /以后还会更多/);
    }
    expect(COPY.en['p.bobby.status']).toContain('INTERNAL BETA');
    expect(COPY.zh['p.bobby.status']).toContain('内测');
    expect(COPY.en['p.bobby.chip1']).toBe('MULTI-SOURCE');
    expect(COPY.en['p.bobby.body']).not.toContain('free model pools');
  });

  it('keeps the O Muse public beta status', () => {
    expect(COPY.en['p.muse.status']).toContain('PUBLIC BETA');
    expect(COPY.zh['p.muse.status']).toContain('公测');
  });
});
