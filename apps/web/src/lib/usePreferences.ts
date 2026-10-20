import { COPY } from '@/content/copy';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { useToast } from '@/lib/toast';

export function usePreferences() {
  const { lang, setLang, t } = useI18n();
  const { theme, setTheme } = useTheme();
  const toast = useToast();

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    toast.show(next === 'light' ? t('toast.themeLight') : t('toast.themeDark'));
  };

  const toggleLang = () => {
    const next = lang === 'zh' ? 'en' : 'zh';
    setLang(next);
    toast.show(COPY[next][next === 'zh' ? 'toast.langZh' : 'toast.langEn']);
  };

  return { lang, theme, toggleLang, toggleTheme };
}
