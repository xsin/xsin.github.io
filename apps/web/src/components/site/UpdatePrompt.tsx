import { useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

/** Check for a new service worker hourly and whenever the tab becomes visible. */
const CHECK_INTERVAL = 60 * 60 * 1000;

/**
 * Version-update prompt: vite-plugin-pwa runs in `prompt` mode, so a new
 * service worker installs and waits instead of taking over silently. The
 * banner only appears once a fresh build is actually waiting.
 */
export function UpdatePrompt() {
  const { t } = useI18n();
  const [updating, setUpdating] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return;
      const check = () => {
        if (!navigator.onLine) return;
        registration.update().catch(() => undefined);
      };
      window.setInterval(check, CHECK_INTERVAL);
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') check();
      });
    },
    onRegisterError(error) {
      console.error('Service worker registration failed', error);
    }
  });

  if (!needRefresh) return null;

  const applyUpdate = async () => {
    setUpdating(true);
    // The plugin reloads on `controllerchange`; this covers a page that is not
    // yet controlled by the old worker (for example, an update found during the
    // very first visit), where that event never fires.
    window.setTimeout(() => window.location.reload(), 1500);
    try {
      await updateServiceWorker(true);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div
      aria-live="polite"
      role="status"
      className="fixed bottom-4 left-1/2 z-[10005] w-[min(480px,calc(100vw-32px))] -translate-x-1/2 rounded-md border border-line-strong bg-bg-2/95 p-4 shadow-2xl backdrop-blur-xl"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-brand-text">
            <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
            {t('pwa.title')}
          </p>
          <p className="mt-1.5 text-xs leading-[1.6] text-fg-muted">{t('pwa.body')}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button size="sm" type="button" onClick={applyUpdate} disabled={updating}>
            {t('pwa.reload')}
          </Button>
          <Button size="sm" variant="ghost" type="button" onClick={() => setNeedRefresh(false)}>
            {t('pwa.later')}
          </Button>
        </div>
      </div>
    </div>
  );
}
