import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { ChromeOrb } from '@/components/visuals/ChromeOrb';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/brand';
import { HudTicks } from './HudTicks';

const tags = {
  en: ['LOCAL-FIRST', 'WEBGL', 'OPEN SOURCE', 'DESKTOP', 'PWA', 'GLSL', 'NO TELEMETRY', 'CANVAS', 'SVG', 'CRAFT'],
  zh: ['本地优先', 'WEBGL', '开源', '桌面', 'PWA', 'GLSL', '零遥测', 'CANVAS', 'SVG', '手艺']
} as const;

export function Marquee() {
  const { lang } = useI18n();
  const half = tags[lang].map((tag) => (
    <span key={tag}>
      {tag} ✳
    </span>
  ));

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {half}
        {half}
      </div>
    </div>
  );
}

export function Hero({ onOpenProduct }: { onOpenProduct: (slug: string) => void }) {
  const { t } = useI18n();
  const { theme } = useTheme();
  const [flow, setFlow] = useState(42);
  const [chrome, setChrome] = useState(62);

  return (
    <section className="hero" id="top" aria-labelledby="heroTitle">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-gridlines" />
        <div className="hero-glow" />
      </div>

      <Container className="relative z-[2] grid flex-1 grid-cols-1 items-center gap-6 pt-6 pb-10 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:py-8">
        <div className="max-w-[840px] py-2">
          <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-muted" data-reveal>
            <span className="pulse-dot" />
            <span>{t('hero.eyebrow')}</span>
            <span className="h-px w-6 bg-line-strong" />
            <span className="text-[8px] text-faint">2026</span>
          </div>

          <h1 id="heroTitle" dangerouslySetInnerHTML={{ __html: t('hero.h1') }} />

          <p className="mt-7 max-w-[48ch] text-[clamp(15px,1.2vw,18px)] leading-[1.65] text-fg-muted" data-reveal>
            {t('hero.lead')}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3 max-[480px]:flex-col max-[480px]:items-stretch" data-reveal>
            <Button asChild className="max-[480px]:w-full">
              <a href="#work">
                <span>{t('hero.cta1')}</span>
                <span className="text-[13px]">↓</span>
              </a>
            </Button>
            <Button asChild variant="outline" className="max-[480px]:w-full">
              <a href="#studio">
                <span>{t('hero.cta2')}</span>
                <span className="text-[13px]">→</span>
              </a>
            </Button>
          </div>

          <div
            className="mt-12 flex max-w-[620px] flex-wrap gap-10 border-t border-line pt-6 max-[480px]:grid max-[480px]:grid-cols-3 max-[480px]:gap-3"
            data-reveal
          >
            {(
              [
                ['hero.stat1', 'hero.stat1l'],
                ['hero.stat2', 'hero.stat2l'],
                ['hero.stat3', 'hero.stat3l']
              ] as const
            ).map(([value, label]) => (
              <div className="flex items-baseline gap-2 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-0.5" key={value}>
                <strong className="font-mono text-xl font-medium tracking-[-0.04em]">{t(value)}</strong>
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-faint">{t(label)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="stage">
            <div className="stage-core">
              <div className="orb-fallback" aria-hidden="true" />
              <ChromeOrb flow={flow / 100} chrome={chrome / 100} theme={theme} />
              <svg className="hud" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
                <circle className="hud-ring faint" cx="300" cy="300" r="288" />
                <circle className="hud-ring dash" cx="300" cy="300" r="250" />
                <circle className="hud-ring" cx="300" cy="300" r="212" opacity="0.22" />
                <HudTicks />
                <g className="hud-rot">
                  <circle className="hud-ring dash" cx="300" cy="300" r="268" />
                  <path className="hud-cross" d="M300 24v16M300 560v16M24 300h16M560 300h16" />
                </g>
                <circle className="hud-arc" cx="300" cy="300" r="232" />
                <text className="hud-label strong" x="300" y="16" textAnchor="middle">
                  XSIN / 01
                </text>
                <text className="hud-label" x="300" y="594" textAnchor="middle">
                  LOCAL SIGNAL FIELD
                </text>
                <text className="hud-label" x="586" y="304" textAnchor="end">
                  60 FPS
                </text>
                <text className="hud-label" x="14" y="304">
                  WEBGL
                </text>
              </svg>

              <button className="orb-tag tag-a" type="button" data-cursor="OPEN" onClick={() => onOpenProduct('ai-bobby')}>
                <span>01</span> AI BOBBY <i>↗</i>
              </button>
              <button className="orb-tag tag-b" type="button" data-cursor="OPEN" onClick={() => onOpenProduct('o-muse')}>
                <span>02</span> O MUSE <i>↗</i>
              </button>
            </div>
          </div>

          <div className="signal-control">
            <div className="signal-head">
              <span>{t('hero.signal')}</span>
              <span>{t('hero.live')}</span>
            </div>
            <label>
              <span>{t('hero.flow')}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={flow}
                onChange={(event) => setFlow(Number(event.currentTarget.value))}
                aria-label={t('hero.flow')}
              />
            </label>
            <label>
              <span>{t('hero.chrome')}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={chrome}
                onChange={(event) => setChrome(Number(event.currentTarget.value))}
                aria-label={t('hero.chrome')}
              />
            </label>
          </div>

          <div className="visual-coord">
            <b>{t('hero.origin')}</b> · <span>{t('hero.render')}</span>
          </div>
        </div>
      </Container>

      <div className="relative z-[2] border-t border-line">
        <Container className="flex items-center justify-between gap-6 py-4 font-mono text-[8px] uppercase tracking-[0.16em] text-faint">
          <a className="inline-flex items-center gap-3 text-fg-muted transition-colors hover:text-ink" href="#work">
            <span className="scroll-line" />
            <span>{t('hero.scroll')}</span>
          </a>
          <span className="hidden md:inline">{t('hero.available')}</span>
          <a className="transition-colors hover:text-ink" href="https://github.com/xsin" target="_blank" rel="noreferrer">
            GITHUB ↗
          </a>
        </Container>
      </div>

      <Marquee />
    </section>
  );
}
