import type { CSSProperties } from 'react';
import { useI18n } from '@/lib/i18n';
import { Container, SectionLabel } from '@/components/ui/brand';
import { MiniChrome } from '@/components/visuals/MiniChrome';
import { ParticleField } from '@/components/visuals/ParticleField';
import { KineticType } from '@/components/visuals/KineticType';
import { craftStageClass, craftTagClass } from './craftStage';

const experiments = [
  { stage: 'shaderStage', tag: 'GLSL', title: 'craft.e1t', body: 'craft.e1d', meta: 'craft.e1m' },
  { stage: 'fieldStage', tag: 'CANVAS 2D', title: 'craft.e2t', body: 'craft.e2d', meta: 'craft.e2m' },
  { stage: null, tag: 'SVG', title: 'craft.e3t', body: 'craft.e3d', meta: 'craft.e3m' }
] as const;

const stack = ['React 19', 'Vite 8', 'TypeScript 7', 'Tailwind CSS 4', 'shadcn/ui', 'pnpm', 'WebGL', 'PWA'];

export function Craft() {
  const { t } = useI18n();

  return (
    <section className="relative py-[clamp(96px,11vw,168px)]" id="craft" aria-labelledby="craftTitle">
      <Container>
        <div
          className="flex items-center justify-between gap-6 border-b border-line pb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-muted"
          data-reveal
        >
          <SectionLabel num="03">{t('craft.label')}</SectionLabel>
          <span className="hidden text-[8px] text-faint sm:inline">{t('craft.note')}</span>
        </div>

        <div className="grid gap-6 pt-8 pb-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-[clamp(32px,5vw,80px)]">
          <h2
            className="text-[clamp(40px,5.6vw,88px)] font-medium leading-[0.92] tracking-[-0.05em] [&_em]:font-display [&_em]:font-normal [&_em]:italic [&_em]:tracking-[-0.02em] [&_em]:text-brand-text zh:font-semibold zh:leading-[1.05] zh:tracking-[-0.03em] zh:[&_em]:not-italic"
            id="craftTitle"
            data-reveal
            dangerouslySetInnerHTML={{ __html: t('craft.title') }}
          />
          <p className="max-w-[42ch] text-[clamp(15px,1.2vw,17px)] leading-[1.65] text-fg-muted" data-reveal>
            {t('craft.intro')}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {experiments.map((experiment, index) => (
            <article
              className="group flex flex-col overflow-hidden rounded-lg border border-line bg-panel transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-panel-2"
              key={experiment.tag}
              data-reveal
              style={{ '--d': `${index * 0.05}s` } as CSSProperties}
            >
              {experiment.stage ? (
                <div className={craftStageClass} id={experiment.stage}>
                  {experiment.stage === 'shaderStage' ? <MiniChrome /> : <ParticleField />}
                  <span className={craftTagClass}>{experiment.tag}</span>
                </div>
              ) : (
                <div className="relative">
                  <KineticType />
                  <span className={craftTagClass}>{experiment.tag}</span>
                </div>
              )}
              <div className="flex flex-col gap-2 p-5">
                <h3 className="text-xl font-medium tracking-[-0.025em]">{t(experiment.title)}</h3>
                <p className="text-xs leading-[1.6] text-fg-muted">{t(experiment.body)}</p>
                <span className="mt-1 font-mono text-[7px] text-faint">{t(experiment.meta)}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-line pt-5" data-reveal>
          <span className="mr-2 font-mono text-[8px] uppercase tracking-[0.16em] text-faint">{t('craft.stack')}</span>
          {stack.map((item) => (
            <span
              className="inline-flex h-7 items-center rounded-sm border border-line px-2.5 font-mono text-[8px] tracking-[0.06em] text-fg-muted transition-colors hover:border-line-strong hover:text-ink"
              key={item}
            >
              {item}
            </span>
          ))}
          <span className="ml-auto max-w-[48ch] font-mono text-[8px] leading-[1.6] tracking-[0.06em] text-faint max-[980px]:ml-0">{t('craft.stackNote')}</span>
        </div>
      </Container>
    </section>
  );
}
