import { useI18n } from '@/lib/i18n';
import { useClock } from '@/lib/useClock';
import { Button } from '@/components/ui/button';
import { Container, SectionLabel } from '@/components/ui/brand';

export function Contact({ onInstall }: { onInstall: () => void }) {
  const { t } = useI18n();
  const clock = useClock();

  return (
    <section
      className="relative overflow-hidden border-t border-line pt-[clamp(96px,11vw,168px)] pb-[clamp(96px,11vw,168px)]"
      id="contact"
      aria-labelledby="contactTitle"
    >
      <div className="contact-glow" aria-hidden="true" />
      <Container>
        <div
          className="relative z-[2] flex items-center justify-between gap-6 border-b border-line pb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-muted"
          data-reveal
        >
          <SectionLabel num="04">{t('contact.label')}</SectionLabel>
          <span className="hidden text-[8px] text-faint sm:inline">{t('contact.note')}</span>
        </div>

        <h2
          className="relative z-[2] mt-12 text-[clamp(56px,10.6vw,156px)] font-medium leading-[0.84] tracking-[-0.06em] [&_em]:font-display [&_em]:font-normal [&_em]:italic [&_em]:tracking-[-0.02em] [&_em]:text-brand-text zh:text-[clamp(52px,9.4vw,142px)] zh:font-semibold zh:leading-[1.02] zh:tracking-[-0.035em] zh:[&_em]:not-italic"
          id="contactTitle"
          data-reveal
          dangerouslySetInnerHTML={{ __html: t('contact.title') }}
        />
        <p className="relative z-[2] mt-8 max-w-[46ch] text-[clamp(15px,1.3vw,18px)] leading-[1.65] text-fg-muted" data-reveal>
          {t('contact.lead')}
        </p>

        <div className="relative z-[2] mt-9 flex flex-wrap items-center gap-3" data-reveal>
          <Button asChild>
            <a href="https://github.com/xsin" target="_blank" rel="noreferrer">
              <span>{t('contact.cta1')}</span>
              <span className="text-[13px]">↗</span>
            </a>
          </Button>
          <Button variant="outline" type="button" onClick={onInstall}>
            <span>{t('contact.cta2')}</span>
            <span className="text-[13px]">↓</span>
          </Button>
          <Button asChild variant="ghost">
            <a href="https://github.com/xsin?tab=repositories" target="_blank" rel="noreferrer">
              <span>{t('contact.cta3')}</span>
              <span className="text-[13px]">→</span>
            </a>
          </Button>
        </div>

        <div
          className="relative z-[2] mt-20 grid gap-6 border-t border-line pt-5 max-[760px]:grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
          data-reveal
        >
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-faint">ELSEWHERE</span>
            <div className="flex flex-wrap gap-4">
              <a className="text-xs text-fg-muted transition-colors hover:text-ink" href="https://github.com/xsin" target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a className="text-xs text-fg-muted transition-colors hover:text-ink" href="https://github.com/xsin/ai-bobby" target="_blank" rel="noreferrer">
                AI Bobby ↗
              </a>
              <a className="text-xs text-fg-muted transition-colors hover:text-ink" href="https://github.com/xsin/o-muse" target="_blank" rel="noreferrer">
                O Muse ↗
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-faint">{t('contact.address')}</span>
            <address className="text-xs not-italic leading-[1.6] text-fg-muted">深圳市光明区迳口古村225-3</address>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-faint">{t('contact.time')}</span>
            <span className="text-xs text-fg-muted">GMT+8 · {clock}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-faint">{t('contact.status')}</span>
            <span className="text-xs text-fg-muted">{t('contact.open')}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
