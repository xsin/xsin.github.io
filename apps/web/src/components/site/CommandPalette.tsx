import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { products } from '@xsin/content';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/lib/i18n';
import { usePreferences } from '@/lib/usePreferences';
import { useToast } from '@/lib/toast';
import { cn } from '@/lib/utils';

interface PaletteItem {
  group: 'nav' | 'products' | 'actions';
  icon: string;
  label: string;
  run: () => void;
}

const groupKeys = {
  nav: 'palette.nav',
  products: 'palette.products',
  actions: 'palette.actions'
} as const;

export function CommandPalette({
  open,
  onClose,
  onOpenProduct,
  onInstall
}: {
  open: boolean;
  onClose: () => void;
  onOpenProduct: (slug: string) => void;
  onInstall: () => void;
}) {
  const { t } = useI18n();
  const { toggleLang, toggleTheme } = usePreferences();
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);

  const items = useMemo<PaletteItem[]>(() => {
    const go = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const copy = async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
        toast.show(t('toast.copied'));
      } catch {
        toast.show(t('toast.copyFail'));
      }
    };
    const list: PaletteItem[] = [
      { group: 'nav', icon: '01', label: t('nav.work'), run: () => go('work') },
      { group: 'nav', icon: '02', label: t('nav.studio'), run: () => go('studio') },
      { group: 'nav', icon: '03', label: t('nav.craft'), run: () => go('craft') },
      { group: 'nav', icon: '04', label: t('nav.contact'), run: () => go('contact') }
    ];
    products.forEach((product) => {
      list.push({
        group: 'products',
        icon: product.mark,
        label: product.name,
        run: () => onOpenProduct(product.slug)
      });
    });
    list.push(
      { group: 'actions', icon: '◐', label: t('palette.theme'), run: toggleTheme },
      { group: 'actions', icon: '中', label: t('palette.lang'), run: toggleLang },
      { group: 'actions', icon: '⧉', label: t('palette.copyBobby'), run: () => void copy(products[0]?.links.install ?? '') },
      { group: 'actions', icon: '⧉', label: t('palette.copyMuse'), run: () => void copy(products[1]?.links.install ?? '') },
      { group: 'actions', icon: '↗', label: t('palette.github'), run: () => window.open('https://github.com/xsin', '_blank', 'noreferrer') },
      { group: 'actions', icon: '↓', label: t('palette.install'), run: onInstall }
    );
    return list;
  }, [onInstall, onOpenProduct, t, toast, toggleLang, toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((item) => item.label.toLowerCase().includes(q)) : items;
  }, [items, query]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setIndex(0);
    const timer = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 40);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    setIndex(0);
  }, [query]);

  const run = (item: PaletteItem | undefined) => {
    if (!item) return;
    onClose();
    window.setTimeout(() => item.run(), 40);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (filtered.length) setIndex((value) => (value + 1) % filtered.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (filtered.length) setIndex((value) => (value - 1 + filtered.length) % filtered.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      run(filtered[index]);
    }
  };

  let lastGroup: PaletteItem['group'] | null = null;

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent
        unstyled
        className="top-[14vh] w-[min(640px,calc(100vw-32px))] overflow-hidden rounded-md border border-line-strong bg-bg-2 text-ink shadow-2xl"
        showCloseButton={false}
        onKeyDown={onKeyDown}
      >
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <DialogDescription className="sr-only">{t('palette.placeholder')}</DialogDescription>

        <div className="flex h-14 items-center gap-3 border-b border-line px-5">
          <span className="font-mono text-[9px] tracking-[0.08em] text-faint">⌘K</span>
          <Input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('palette.placeholder')}
            aria-label={t('palette.placeholder')}
            className="h-full flex-1 rounded-none border-0 bg-transparent px-0 text-[15px] shadow-none ring-0 outline-none focus-visible:ring-0 dark:bg-transparent md:text-[15px]"
          />
        </div>

        <div className="max-h-[360px] overflow-y-auto p-2" role="listbox" aria-label="Command palette">
          {filtered.map((item, itemIndex) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <div key={`${item.group}-${item.label}`}>
                {showGroup ? (
                  <div className="px-2 pt-2 pb-1 font-mono text-[7px] uppercase tracking-[0.16em] text-faint">{t(groupKeys[item.group])}</div>
                ) : null}
                <button
                  type="button"
                  className={cn(
                    'flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left text-sm text-fg-muted transition-colors',
                    'hover:bg-panel-2 hover:text-ink',
                    itemIndex === index && 'bg-panel-2 text-ink'
                  )}
                  role="option"
                  aria-selected={itemIndex === index}
                  onMouseEnter={() => setIndex(itemIndex)}
                  onClick={() => run(item)}
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded border border-line font-mono text-[8px] text-brand-text">{item.icon}</span>
                  <span>{item.label}</span>
                  <span className="ml-auto font-mono text-[9px] text-faint">↵</span>
                </button>
              </div>
            );
          })}
          {!filtered.length ? <p className="px-3 py-6 text-center text-xs text-faint">{t('palette.placeholder')}</p> : null}
        </div>

        <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[7px] uppercase tracking-[0.12em] text-faint">
          <span>↑↓ {t('palette.nav')}</span>
          <span>↵ {t('common.open')}</span>
          <span>ESC {t('common.close')}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
