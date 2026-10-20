import { products } from '@xsin/content';
import { useI18n } from '@/lib/i18n';
import { Container, SectionLabel } from '@/components/ui/brand';
import { ProductCard } from './ProductCard';

export function Work({ onOpenProduct }: { onOpenProduct: (slug: string) => void }) {
  const { t } = useI18n();

  return (
    <section className="relative pt-[clamp(80px,9vw,128px)] pb-[clamp(96px,11vw,168px)]" id="work" aria-labelledby="workTitle">
      <Container>
        <div
          className="flex items-center justify-between gap-6 border-b border-line pb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-muted"
          data-reveal
        >
          <SectionLabel num="01">{t('work.label')}</SectionLabel>
          <span className="text-[8px] text-faint">{t('work.note')}</span>
        </div>

        <div className="grid gap-[clamp(32px,5vw,80px)] pt-8 pb-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
          <h2
            className="text-[clamp(40px,5.6vw,88px)] font-medium leading-[0.92] tracking-[-0.05em] [&_em]:font-display [&_em]:font-normal [&_em]:italic [&_em]:tracking-[-0.02em] [&_em]:text-brand-text zh:font-semibold zh:leading-[1.05] zh:tracking-[-0.03em] zh:[&_em]:not-italic"
            id="workTitle"
            data-reveal
            dangerouslySetInnerHTML={{ __html: t('work.title') }}
          />
          <p className="max-w-[42ch] text-[clamp(15px,1.2vw,17px)] leading-[1.65] text-fg-muted" data-reveal>
            {t('work.intro')}
          </p>
        </div>

        <div className="border-t border-line">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} onOpen={() => onOpenProduct(product.slug)} />
          ))}
        </div>
      </Container>
    </section>
  );
}
