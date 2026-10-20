import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useI18n } from '@/lib/i18n';
import { usePwaInstall } from '@/lib/usePwaInstall';
import { useToast } from '@/lib/toast';
import { Button } from '@/components/ui/button';

export function InstallDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();
  const { install } = usePwaInstall();
  const toast = useToast();
  const [busy, setBusy] = useState(false);

  const onInstall = async () => {
    setBusy(true);
    const result = await install();
    setBusy(false);
    if (result === 'accepted') {
      toast.show(t('toast.installed'));
      onClose();
      return;
    }
    if (result === 'unavailable') {
      toast.show(t('toast.install'));
      return;
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent
        unstyled
        className="top-1/2 -translate-y-1/2 w-[min(480px,calc(100vw-32px))] overflow-hidden rounded-xl border border-line-strong bg-bg-2 text-ink shadow-2xl"
        showCloseButton={false}
      >
        <div className="p-8 text-center">
          <img className="mx-auto mb-4 size-[72px] rounded-2xl shadow-[0_12px_40px_rgba(200,255,61,0.16)]" src="/icons/icon-192.png" alt="" width={72} height={72} />
          <DialogTitle asChild>
            <h2 className="text-[26px] font-medium tracking-[-0.035em]" id="installTitle">
              {t('install.title')}
            </h2>
          </DialogTitle>
          <DialogDescription asChild>
            <p className="mx-auto mt-2 max-w-[36ch] text-[13px] leading-[1.6] text-fg-muted">{t('install.desc')}</p>
          </DialogDescription>

          <div className="my-6 grid gap-2 text-left">
            {(
              [
                ['1', 'install.step1'],
                ['2', 'install.step2'],
                ['3', 'install.step3']
              ] as const
            ).map(([no, key]) => (
              <div className="flex items-center gap-3 rounded-sm border border-line px-3 py-2.5 text-xs" key={key}>
                <b className="grid size-5 shrink-0 place-items-center rounded-full bg-panel-2 font-mono text-[8px] font-normal">{no}</b>
                <span>{t(key)}</span>
              </div>
            ))}
          </div>

          <div className="mt-1 flex justify-center gap-2">
            <Button size="sm" type="button" onClick={onInstall} disabled={busy}>
              {t('install.action')}
            </Button>
            <Button size="sm" variant="ghost" type="button" onClick={onClose}>
              {t('install.later')}
            </Button>
          </div>
          <p className="mt-3 font-mono text-[8px] leading-[1.6] text-faint">{t('install.note')}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
