import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { useClock } from '@/lib/useClock';
import { usePreferences } from '@/lib/usePreferences';
import { cn } from '@/lib/utils';
import { BrandMark } from './BrandMark';
import { Button } from '@/components/ui/button';
import { Container, IconButton, LangButton, ThemeGlyph } from '@/components/ui/brand';

const items = [
  { id: 'work', key: 'nav.work' },
  { id: 'studio', key: 'nav.studio' },
  { id: 'craft', key: 'nav.craft' },
  { id: 'contact', key: 'nav.contact' }
] as const;

export function NavBar({
  active,
  menuOpen,
  onToggleMenu,
  onOpenPalette,
  onInstall
}: {
  active: string;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onOpenPalette: () => void;
  onInstall: () => void;
}) {
  const { t, lang } = useI18n();
  const { theme, toggleLang, toggleTheme } = usePreferences();
  const clock = useClock();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[100] h-nav border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled ? 'border-line bg-bg/80 backdrop-blur-xl' : 'border-transparent'
      )}
    >
      <Container className="flex h-full items-center justify-between gap-6">
        <a className="group inline-flex shrink-0 items-center gap-3 text-ink" href="#top" aria-label="XSin Studio — back to top" data-cursor="TOP">
          <BrandMark className="transition-transform duration-500 group-hover:rotate-90" />
          <span className="flex flex-col gap-px font-mono text-[10px] leading-[1.1] tracking-[0.16em]">
            <strong className="font-semibold">XSIN</strong>
            <em className="text-[7px] not-italic tracking-[0.24em] text-faint">STUDIO</em>
          </span>
        </a>

        <nav className="ml-auto mr-6 hidden items-center gap-7 md:flex" aria-label="Primary">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-nav={item.id}
                className={cn(
                  'relative py-2 text-[13px] transition-colors',
                  'after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-brand after:transition-transform after:duration-300',
                  'hover:text-ink hover:after:origin-left hover:after:scale-x-100',
                  isActive ? 'text-ink after:origin-left after:scale-x-100' : 'text-fg-muted'
                )}
              >
                {t(item.key)}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-baseline gap-1.5 px-2 font-mono text-[9px] tracking-[0.08em] whitespace-nowrap text-fg-muted xl:inline-flex" id="navClock">
            <span id="navClockTime">{clock}</span>
            <span className="text-[7px] text-faint">GMT+8</span>
          </div>
          <IconButton
            className="hidden md:grid"
            id="paletteBtn"
            aria-label="Open command palette"
            data-cursor="⌘K"
            onClick={onOpenPalette}
          >
            ⌘K
          </IconButton>
          <IconButton aria-label="Toggle color theme" data-cursor="THEME" aria-pressed={theme === 'light'} onClick={toggleTheme}>
            <ThemeGlyph />
          </IconButton>
          <LangButton aria-label="Switch language" data-cursor="LANG" onClick={toggleLang}>
            {lang === 'zh' ? 'EN' : '中'}
          </LangButton>
          <Button size="sm" className="ml-1 hidden md:inline-flex" onClick={onInstall}>
            {t('nav.install')}
          </Button>
          <button
            className="relative grid size-10 place-items-center rounded-sm border border-line md:hidden"
            id="menuBtn"
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            onClick={onToggleMenu}
          >
            <span
              className={cn(
                'absolute left-2.5 right-2.5 h-px bg-ink transition-[transform,top] duration-300',
                menuOpen ? 'top-5 rotate-45' : 'top-4'
              )}
            />
            <span
              className={cn(
                'absolute left-2.5 right-2.5 h-px bg-ink transition-[transform,top] duration-300',
                menuOpen ? 'top-5 -rotate-45' : 'top-[23px]'
              )}
            />
          </button>
        </div>
      </Container>
    </header>
  );
}
