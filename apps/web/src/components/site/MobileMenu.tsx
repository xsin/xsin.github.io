import { useEffect, useRef } from 'react';
import { useI18n } from '@/lib/i18n';
import { useClock } from '@/lib/useClock';
import { usePreferences } from '@/lib/usePreferences';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { IconButton, LangButton, ThemeGlyph } from '@/components/ui/brand';
import { SoundToggle } from './SoundToggle';

const items = [
  { id: 'work', key: 'nav.work', no: '01' },
  { id: 'studio', key: 'nav.studio', no: '02' },
  { id: 'craft', key: 'nav.craft', no: '03' },
  { id: 'contact', key: 'nav.contact', no: '04' }
] as const;

export function MobileMenu({ open, onClose, onInstall }: { open: boolean; onClose: () => void; onInstall: () => void }) {
  const { t, lang } = useI18n();
  const { toggleLang, toggleTheme } = usePreferences();
  const clock = useClock();
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (open) firstLink.current?.focus({ preventScroll: true });
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[90] flex flex-col justify-between bg-bg px-gutter pt-[calc(var(--nav-h)+32px)] pb-8',
        'transition-[opacity,transform,visibility] duration-300',
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
      )}
      id="mobileMenu"
      aria-hidden={!open}
    >
      <nav aria-label="Mobile primary">
        {items.map((item, index) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={onClose}
            ref={index === 0 ? firstLink : undefined}
            className="flex items-baseline gap-4 border-b border-line py-4 text-[clamp(32px,9vw,48px)] leading-none tracking-[-0.04em]"
          >
            <span className="shrink-0 font-mono text-[9px] tracking-[0.12em] text-brand-text">{item.no}</span>
            <span className="text-ink">{t(item.key)}</span>
          </a>
        ))}
      </nav>
      <p className="max-w-[30ch] text-sm leading-relaxed text-fg-muted">{t('menu.note')}</p>
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[9px] tracking-[0.08em] text-faint">GMT+8 · {clock.slice(0, 5)}</span>
        <div className="flex items-center gap-2">
          <SoundToggle />
          <IconButton aria-label="Toggle theme" onClick={toggleTheme}>
            <ThemeGlyph />
          </IconButton>
          <LangButton aria-label="Switch language" onClick={toggleLang}>
            {lang === 'zh' ? 'EN' : '中'}
          </LangButton>
          <Button
            size="sm"
            onClick={() => {
              onClose();
              onInstall();
            }}
          >
            {t('nav.install')}
          </Button>
        </div>
      </div>
    </div>
  );
}
