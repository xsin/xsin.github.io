import { useMemo, useState, type CSSProperties } from 'react';
import { products } from '@xsin/content';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useI18n } from '@/lib/i18n';
import { useToast } from '@/lib/toast';
import { Button } from '@/components/ui/button';
import { StatusPill } from '@/components/ui/brand';

export function ProductDialog({
  slug,
  onClose,
  onOpenProduct
}: {
  slug: string | null;
  onClose: () => void;
  onOpenProduct: (slug: string) => void;
}) {
  const { t, lang } = useI18n();
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const product = useMemo(() => products.find((item) => item.slug === slug), [slug]);

  if (!product) return null;

  const copy = product[lang];
  const next = products.find((item) => item.slug !== product.slug) ?? product;
  const accent = { '--pc': product.color, '--pc2': product.color2 } as CSSProperties;

  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText(product.links.install);
      setCopied(true);
      toast.show(t('toast.copied'));
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      toast.show(t('toast.copyFail'));
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        unstyled
        className="top-1/2 -translate-y-1/2 flex max-h-[calc(100dvh-32px)] w-[min(1080px,calc(100vw-32px))] flex-col overflow-hidden rounded-xl border border-line-strong bg-bg-2 text-ink shadow-2xl"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <DialogDescription className="sr-only">{copy.tagline}</DialogDescription>

        <div className="flex h-14 shrink-0 items-center justify-between border-b border-line px-5">
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-fg-muted">
            {String(product.index).padStart(2, '0')} / {product.name.toUpperCase()}
          </span>
          <button
            className="grid size-9 place-items-center rounded-sm border border-line text-sm text-fg-muted transition-colors hover:border-line-strong hover:bg-panel hover:text-ink"
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
          >
            ✕
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain" id="pdScroll">
          <div
            className="relative overflow-hidden border-b border-line p-12 max-[760px]:p-6"
            style={{ ...accent, background: `radial-gradient(110% 120% at 88% -10%, color-mix(in srgb, ${product.color} 24%, transparent), transparent 62%), var(--bg-2)` }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 right-6 select-none font-display text-[240px] leading-none opacity-10 max-[760px]:text-[150px]"
              style={{ color: product.color }}
            >
              {product.mark}
            </span>
            <div className="relative z-[2] flex flex-wrap items-center gap-3">
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-fg-muted">{copy.category}</span>
              <StatusPill>{copy.status}</StatusPill>
            </div>
            <h2 id="pdTitle" className="relative z-[2] mt-4 text-[clamp(52px,6.4vw,92px)] font-medium leading-[0.9] tracking-[-0.06em]">
              {product.name}
            </h2>
            <p className="relative z-[2] mt-3 font-display text-[clamp(24px,2.4vw,34px)] italic leading-[1.15] text-[var(--pc2)]">{copy.tagline}</p>
            <p className="relative z-[2] mt-5 max-w-[62ch] text-sm leading-[1.7] text-fg-muted">{copy.body}</p>
            <div className="relative z-[2] mt-6 flex flex-wrap items-center gap-2">
              <Button asChild>
                <a href={product.links.github} target="_blank" rel="noreferrer">
                  {t('common.github')} <span className="text-[13px]">↗</span>
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={product.links.releases} target="_blank" rel="noreferrer">
                  {t('common.releases')} <span className="text-[13px]">→</span>
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href={product.links.website} target="_blank" rel="noreferrer">
                  {t('common.website')} <span className="text-[13px]">↗</span>
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-12 p-12 max-[760px]:p-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]" style={accent}>
            <div className="min-w-0">
              <h3 className="mb-2 border-b border-line pb-2 font-mono text-[8px] uppercase tracking-[0.16em] text-faint">{t('pd.capabilities')}</h3>
              {copy.features.map((feature, index) => (
                <div className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 border-b border-line py-4" key={feature.title}>
                  <span className="pt-0.5 font-mono text-[8px] text-[var(--pc)]">0{index + 1}</span>
                  <div>
                    <strong className="mb-1 block text-sm font-medium tracking-[-0.01em]">{feature.title}</strong>
                    <p className="text-xs leading-[1.65] text-fg-muted">{feature.body}</p>
                  </div>
                </div>
              ))}
              <div className="mt-6 min-w-0 rounded-md border border-line bg-screen p-4 text-white/90">
                <div className="mb-3 flex items-center justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.12em] text-white/40">
                  <span>{t('pd.install')}</span>
                  <button className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/60 transition-colors hover:text-white" type="button" onClick={copyInstall}>
                    {copied ? t('common.copied') : t('common.copy')}
                  </button>
                </div>
                <code className="block max-w-full overflow-x-auto whitespace-nowrap font-mono text-[11px] leading-[1.6] text-brand">{product.links.install}</code>
              </div>
            </div>

            <aside className="min-w-0 rounded-md border border-line bg-panel p-5">
              <h3 className="mb-2 border-b border-line pb-2 font-mono text-[8px] uppercase tracking-[0.16em] text-faint">{t('pd.spec')}</h3>
              <dl className="text-xs">
                {copy.spec.map((row) => (
                  <div className="flex justify-between gap-4 border-b border-line py-2 last:border-0" key={row.label}>
                    <dt className="font-mono text-[7px] uppercase tracking-[0.12em] text-faint">{row.label}</dt>
                    <dd className="text-right text-[11px] text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 border-l border-[var(--pc)] pl-2.5 font-mono text-[8px] leading-[1.7] text-faint">{copy.note}</p>
            </aside>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-12 py-4 max-[760px]:px-6" style={accent}>
            <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-faint">
              {t('pd.next')} / {next.name}
            </span>
            <Button variant="ghost" size="sm" type="button" onClick={() => onOpenProduct(next.slug)}>
              {t('common.next')} <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
