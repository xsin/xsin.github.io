import { useEffect, useState } from 'react';
import { NavBar } from '@/components/site/NavBar';
import { MobileMenu } from '@/components/site/MobileMenu';
import { Hero } from '@/components/site/Hero';
import { Work } from '@/components/site/Work';
import { Studio } from '@/components/site/Studio';
import { Craft } from '@/components/site/Craft';
import { Contact } from '@/components/site/Contact';
import { Footer } from '@/components/site/Footer';
import { ScrollProgress } from '@/components/site/ScrollProgress';
import { Cursor } from '@/components/site/Cursor';
import { ProductDialog } from '@/components/site/ProductDialog';
import { CommandPalette } from '@/components/site/CommandPalette';
import { InstallDialog } from '@/components/site/InstallDialog';
import { UpdatePrompt } from '@/components/site/UpdatePrompt';
import { useActiveSection } from '@/lib/useActiveSection';
import { useReveals, useIsReady } from '@/lib/useReveals';

function productFromHash(): string | null {
  const match = window.location.hash.match(/^#\/work\/([^/]+)$/);
  return match?.[1] ?? null;
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [installOpen, setInstallOpen] = useState(false);
  const [productSlug, setProductSlug] = useState<string | null>(() => productFromHash());
  const active = useActiveSection(['work', 'studio', 'craft', 'contact'], 'work');

  useIsReady();
  useReveals([]);

  useEffect(() => {
    const onHashChange = () => setProductSlug(productFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openProduct = (slug: string) => {
    setProductSlug(slug);
    window.history.replaceState(null, '', `#/work/${slug}`);
  };

  const closeProduct = () => {
    setProductSlug(null);
    window.history.replaceState(null, '', '#work');
  };

  return (
    <>
      <ScrollProgress />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <NavBar
        active={active}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onOpenPalette={() => setPaletteOpen(true)}
        onInstall={() => setInstallOpen(true)}
      />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onInstall={() => setInstallOpen(true)} />

      <main id="main">
        <Hero onOpenProduct={openProduct} />
        <Work onOpenProduct={openProduct} />
        <Studio />
        <Craft />
        <Contact onInstall={() => setInstallOpen(true)} />
      </main>
      <Footer />

      <ProductDialog slug={productSlug} onClose={closeProduct} onOpenProduct={openProduct} />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenProduct={openProduct}
        onInstall={() => {
          setPaletteOpen(false);
          setInstallOpen(true);
        }}
      />
      <InstallDialog open={installOpen} onClose={() => setInstallOpen(false)} />
      <UpdatePrompt />
    </>
  );
}
