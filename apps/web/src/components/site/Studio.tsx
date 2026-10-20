import { useEffect, useRef, type CSSProperties } from 'react';
import { useI18n } from '@/lib/i18n';
import { Container, SectionLabel } from '@/components/ui/brand';
import type { CopyKey } from '@/content/copy';

const stats = [
  ['02', 'studio.stat1l'],
  ['0', 'studio.stat2l'],
  ['02', 'studio.stat3l']
] as const;

function ManifestoCopy() {
  const { t, lang } = useI18n();
  const text = t('studio.copy');
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'));
    if (!words.length) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const start = window.innerHeight * 0.82;
      const end = window.innerHeight * 0.3;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (rect.height + start - end)));
      const lit = Math.round(p * words.length);
      words.forEach((word, index) => word.toggleAttribute('data-lit', index < lit));
    };
    const queue = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [text, lang]);

  const parts = lang === 'zh' ? Array.from(text) : text.split(/(\s+)/);

  return (
    <p className="mt-7 max-w-[46ch] text-[15px] leading-[1.8] text-fg-muted" id="manifestoCopy" ref={ref} data-reveal>
      {parts.map((part, index) => {
        if (!part) return null;
        if (/^\s+$/.test(part)) return part;
        return (
          <span className="text-faint transition-colors duration-[350ms] data-lit:text-ink" data-word key={`${part}-${index}`}>
            {part}
          </span>
        );
      })}
    </p>
  );
}

export function Studio() {
  const { t } = useI18n();

  return (
    <section
      className="relative border-y border-line bg-[color-mix(in_srgb,var(--bg-2)_62%,transparent)] py-[clamp(96px,11vw,168px)]"
      id="studio"
      aria-labelledby="studioTitle"
    >
      <Container>
        <div
          className="flex items-center justify-between gap-6 border-b border-line pb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-muted"
          data-reveal
        >
          <SectionLabel num="02">{t('studio.label')}</SectionLabel>
          <span className="hidden text-[8px] text-faint sm:inline">GMT+8 · INDEPENDENT</span>
        </div>

        <div className="grid gap-12 pt-14 lg:grid-cols-2 lg:gap-[clamp(48px,7vw,104px)]">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+32px)] lg:self-start">
            <h2
              className="text-[clamp(40px,5.6vw,88px)] font-medium leading-[0.92] tracking-[-0.05em] [&_em]:font-display [&_em]:font-normal [&_em]:italic [&_em]:tracking-[-0.02em] [&_em]:text-brand-text zh:font-semibold zh:leading-[1.05] zh:tracking-[-0.03em] zh:[&_em]:not-italic"
              id="studioTitle"
              data-reveal
              dangerouslySetInnerHTML={{ __html: t('studio.title') }}
            />
            <p
              className="mt-6 max-w-[15ch] text-[clamp(30px,3.6vw,52px)] font-normal leading-[1.08] tracking-[-0.035em] [&_em]:font-display [&_em]:italic [&_em]:tracking-[-0.02em] [&_em]:text-brand-text zh:max-w-[14ch] zh:leading-[1.22] zh:tracking-[-0.02em] zh:[&_em]:not-italic max-lg:max-w-[20ch]"
              data-reveal
              dangerouslySetInnerHTML={{ __html: t('studio.lead') }}
            />
            <ManifestoCopy />
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-5 max-[760px]:gap-2" data-reveal>
              {stats.map(([value, label]) => (
                <div key={label}>
                  <strong className="block font-mono text-2xl font-normal tracking-[-0.05em] max-[760px]:text-xl">{value}</strong>
                  <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-faint">{t(label)}</span>
                </div>
              ))}
            </div>
          </div>

          <ol className="border-t border-line">
            {([1, 2, 3, 4] as const).map((n, index) => (
              <li
                className="group grid grid-cols-[40px_minmax(0,1fr)_24px] items-start gap-4 border-b border-line py-6 transition-all duration-300 hover:bg-[linear-gradient(90deg,color-mix(in_srgb,var(--brand)_5%,transparent),transparent_60%)] hover:pl-2 max-[760px]:grid-cols-[32px_minmax(0,1fr)]"
                key={n}
                data-reveal
                style={{ '--d': `${index * 0.05}s` } as CSSProperties}
              >
                <span className="pt-1 font-mono text-[9px] tracking-[0.08em] text-faint">0{n}</span>
                <div>
                  <h3 className="text-[clamp(20px,1.8vw,26px)] font-medium leading-[1.2] tracking-[-0.025em]">{t(`studio.p${n}t` as CopyKey)}</h3>
                  <p className="mt-1.5 max-w-[44ch] text-[13px] leading-[1.65] text-fg-muted">{t(`studio.p${n}d` as CopyKey)}</p>
                </div>
                <span
                  className="pt-0.5 text-base text-faint transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-text max-[760px]:hidden"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
