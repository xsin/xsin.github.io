import { useI18n } from '@/lib/i18n';
import { Container } from '@/components/ui/brand';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-line pb-8 pt-16">
      <Container>
        <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <a
            className="group inline-flex items-start gap-1 text-[clamp(84px,14vw,200px)] font-medium leading-[0.78] tracking-[-0.08em] text-transparent transition-colors [-webkit-text-stroke:1px_var(--line-strong)] hover:text-brand hover:[-webkit-text-stroke-color:transparent]"
            href="#top"
            aria-label="XSin Studio — back to top"
          >
            XSIN
            <span className="mt-[0.1em] font-display text-[0.32em] text-brand-text transition-transform duration-500 [-webkit-text-stroke:0] group-hover:rotate-90">✳</span>
          </a>
          <div className="grid grid-cols-2 gap-6 pb-2 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <span className="mb-1 font-mono text-[7px] uppercase tracking-[0.16em] text-faint">{t('footer.work')}</span>
              <a className="text-xs text-fg-muted transition-colors hover:text-ink" href="https://github.com/xsin/ai-bobby" target="_blank" rel="noreferrer">
                AI Bobby ↗
              </a>
              <a className="text-xs text-fg-muted transition-colors hover:text-ink" href="https://github.com/xsin/o-muse" target="_blank" rel="noreferrer">
                O Muse ↗
              </a>
              <a className="text-xs text-fg-muted transition-colors hover:text-ink" href="#work">
                {t('footer.products')}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="mb-1 font-mono text-[7px] uppercase tracking-[0.16em] text-faint">{t('footer.studio')}</span>
              <a className="text-xs text-fg-muted transition-colors hover:text-ink" href="#studio">
                {t('footer.manifesto')}
              </a>
              <a className="text-xs text-fg-muted transition-colors hover:text-ink" href="#craft">
                {t('footer.craft')}
              </a>
              <a className="text-xs text-fg-muted transition-colors hover:text-ink" href="#contact">
                {t('footer.contact')}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="mb-1 font-mono text-[7px] uppercase tracking-[0.16em] text-faint">{t('footer.elsewhere')}</span>
              <a className="text-xs text-fg-muted transition-colors hover:text-ink" href="https://github.com/xsin" target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a className="text-xs text-fg-muted transition-colors hover:text-ink" href="https://github.com/xsin/ai-bobby/releases" target="_blank" rel="noreferrer">
                Releases ↗
              </a>
              <a className="text-xs text-fg-muted transition-colors hover:text-ink" href="/spec-ui.md">
                {t('footer.spec')}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4 font-mono text-[7px] uppercase tracking-[0.1em] text-faint">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© 2026 XSIN STUDIO</span>
            <a
              className="font-sans text-[10px] normal-case tracking-[0.04em] text-fg-muted transition-colors hover:text-ink"
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noreferrer"
            >
              粤ICP备2021128240号-5
            </a>
          </div>
          <span>{t('footer.draft')}</span>
          <span className="hidden md:inline">REACT 19 · VITE 8 · TS 7 · TAILWIND 4 · SHADCN/UI</span>
          <button
            type="button"
            className="font-mono text-[7px] uppercase tracking-[0.1em] text-fg-muted transition-colors hover:text-ink"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {t('footer.top')}
          </button>
        </div>
      </Container>
    </footer>
  );
}
