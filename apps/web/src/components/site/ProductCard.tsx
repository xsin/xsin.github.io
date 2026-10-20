import { useState, type CSSProperties, type MouseEvent } from 'react';
import type { Product, ProductCopy } from '@xsin/content';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { StatusPill } from '@/components/ui/brand';
import { RoutingField } from '@/components/visuals/RoutingField';
import { StemCanvas } from '@/components/visuals/StemCanvas';

const lanes = [
  { id: 'vocals', name: 'VOCALS', cls: 'v' },
  { id: 'drums', name: 'DRUMS', cls: 'd' },
  { id: 'bass', name: 'BASS', cls: 'b' },
  { id: 'other', name: 'OTHER', cls: 'o' }
] as const;

function Instrument({ product, copy, onOpen }: { product: Product; copy: ProductCopy; onOpen: () => void }) {
  const { t } = useI18n();
  const [muted, setMuted] = useState<Record<string, boolean>>({});
  const [solo, setSolo] = useState<Record<string, boolean>>({});
  const [playing, setPlaying] = useState(false);
  const bobby = product.slug === 'ai-bobby';

  const stop = (event: MouseEvent) => event.stopPropagation();

  return (
    <div
      className={`instrument instrument--${bobby ? 'bobby' : 'muse'}`}
      data-cursor={bobby ? 'OPEN' : 'PLAY'}
      role="button"
      tabIndex={0}
      aria-label={`${product.name} — ${bobby ? 'open dossier' : 'play the local synth demo'}`}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="instrument-bar">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span>{bobby ? 'AI BOBBY / ROUTING' : 'O MUSE / STEM PLAYER'}</span>
        <span className="live">
          <i />
          {bobby ? 'LIVE' : 'LOCAL'}
        </span>
      </div>
      <div className="instrument-stage">
        {bobby ? <RoutingField /> : <StemCanvas playing={playing} muted={muted} solo={solo} />}
        {bobby ? (
          <div className="instrument-overlay">
            {copy.chips.map((chip) => (
              <span className="chip" key={chip}>
                {chip}
              </span>
            ))}
          </div>
        ) : (
          <div className="stem-ui">
            <div className="stem-head">
              <span>DEMUCS / 4 STEMS</span>
              <span>A MIN · 92 BPM</span>
            </div>
            <div className="stem-lanes">
              {lanes.map((lane) => (
                <div className="stem-lane" data-stem={lane.id} key={lane.id}>
                  <span className="stem-name">
                    <i className={lane.cls} />
                    {lane.name}
                  </span>
                  <span className="stem-actions">
                    <button
                      className="ms"
                      type="button"
                      aria-pressed={Boolean(muted[lane.id])}
                      aria-label={`${t('stem.mute')} ${lane.name}`}
                      onClick={(event) => {
                        stop(event);
                        setMuted((value) => ({ ...value, [lane.id]: !value[lane.id] }));
                      }}
                    >
                      M
                    </button>
                    <button
                      className="ms"
                      type="button"
                      aria-pressed={Boolean(solo[lane.id])}
                      aria-label={`${t('stem.solo')} ${lane.name}`}
                      onClick={(event) => {
                        stop(event);
                        setSolo((value) => ({ ...value, [lane.id]: !value[lane.id] }));
                      }}
                    >
                      S
                    </button>
                  </span>
                </div>
              ))}
            </div>
            <div className="stem-transport">
              <button
                className="play-btn"
                id="playBtn"
                type="button"
                aria-label={playing ? t('stem.pause') : t('stem.play')}
                onClick={(event) => {
                  stop(event);
                  setPlaying((value) => !value);
                }}
              >
                {playing ? '❚❚' : '▶'}
              </button>
              <div className="transport-meta">
                <span>{t('stem.demo')}</span>
                <span>{t('stem.local')}</span>
              </div>
              <span className="transport-bpm">92 BPM</span>
            </div>
          </div>
        )}
      </div>
      <div className="instrument-foot">
        {bobby ? (
          <>
            <span className="endpoint">127.0.0.1:46890</span>
            <span>{copy.foot}</span>
          </>
        ) : (
          <>
            <span>{copy.foot}</span>
            <span>4 STEMS / ON-DEVICE</span>
          </>
        )}
        <button
          className="instrument-open"
          type="button"
          onClick={(event) => {
            stop(event);
            onOpen();
          }}
        >
          {t('common.open')} ↗
        </button>
      </div>
    </div>
  );
}

export function ProductCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  const { t, lang } = useI18n();
  const copy = product[lang];
  const muse = product.slug === 'o-muse';

  return (
    <article
      className="grid items-center gap-[clamp(40px,5vw,72px)] border-b border-line py-[clamp(56px,7vw,96px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)]"
      data-product={product.slug}
      style={{ '--pc': product.color, '--pc2': product.color2 } as CSSProperties}
    >
      <div className={cn('min-w-0', muse && 'lg:order-2')} data-reveal>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-[30px] leading-none text-[var(--pc)]">{String(product.index).padStart(2, '0')}</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-fg-muted">{product.name.toUpperCase()}</span>
          <StatusPill>{copy.status}</StatusPill>
        </div>

        <h3
          className="my-6 text-[clamp(38px,4.4vw,68px)] font-medium leading-[0.94] tracking-[-0.05em] [&_em]:font-display [&_em]:font-normal [&_em]:italic [&_em]:tracking-[-0.02em] [&_em]:text-[var(--pc2)] zh:font-semibold zh:leading-[1.08] zh:tracking-[-0.03em] zh:[&_em]:not-italic"
          dangerouslySetInnerHTML={{ __html: copy.title }}
        />
        <p className="max-w-[50ch] text-[15px] leading-[1.7] text-fg-muted">{copy.cardBody}</p>

        <ul className="my-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
          {copy.features.map((feature, index) => (
            <li key={feature.title} className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 font-mono text-[8px] tracking-[0.08em] text-[var(--pc)]">0{index + 1}</span>
              <div>
                <strong className="mb-1 block text-[13px] font-medium tracking-[-0.01em]">{feature.title}</strong>
                <p className="text-xs leading-[1.55] text-fg-muted">{feature.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={onOpen}>
            <span>{t('common.openDossier')}</span>
            <span className="text-[13px]">↗</span>
          </Button>
          <Button asChild variant="ghost">
            <a href={product.links.github} target="_blank" rel="noreferrer">
              GitHub <span className="text-[13px]">↗</span>
            </a>
          </Button>
        </div>
      </div>

      <div className={cn('min-w-0', muse && 'lg:order-1')} data-reveal style={{ '--d': '0.08s' } as CSSProperties}>
        <Instrument product={product} copy={copy} onOpen={onOpen} />
      </div>
    </article>
  );
}
