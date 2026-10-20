import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { COPY, type CopyKey, type Lang } from '@/content/copy';
import { store } from '@/lib/store';

interface I18nValue {
  lang: Lang;
  t: (key: CopyKey) => string;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nValue | null>(null);

function detectLang(): Lang {
  const stored = store.get('xsin.lang');
  if (stored === 'zh' || stored === 'en') return stored;
  const html = document.documentElement.lang;
  if (html.startsWith('zh')) return 'zh';
  const nav = navigator.language.toLowerCase();
  return nav.startsWith('zh') ? 'zh' : 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (typeof document === 'undefined' ? 'en' : detectLang()));

  const t = useCallback(
    (key: CopyKey) => {
      const dict = COPY[lang] as Record<string, string | undefined>;
      return dict[key] ?? COPY.en[key] ?? key;
    },
    [lang]
  );

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    store.set('xsin.lang', next);
  }, []);

  const toggleLang = useCallback(() => setLang(lang === 'zh' ? 'en' : 'zh'), [lang, setLang]);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = COPY[lang]['meta.title'];
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', COPY[lang]['meta.desc']);
  }, [lang]);

  const value = useMemo(() => ({ lang, t, setLang, toggleLang }), [lang, t, setLang, toggleLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside I18nProvider');
  return value;
}
