import { useI18n } from '@/lib/i18n';
import { useToast } from '@/lib/toast';
import { useAmbientSound } from '@/lib/useAmbientSound';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/ui/brand';

/**
 * Ambience switch: four level bars that animate while the bed plays, and a
 * single hairline through them while it is muted. Icon-only, so the accessible
 * name carries the meaning; `aria-pressed` carries the state.
 */
export function SoundToggle({ className }: { className?: string }) {
  const { t } = useI18n();
  const { show } = useToast();
  const { on, supported, toggle } = useAmbientSound();
  const label = t(on ? 'sound.off' : 'sound.on');

  return (
    <IconButton
      className={cn('sound-toggle', on && 'is-on', className)}
      data-sound-toggle=""
      data-cursor="SOUND"
      aria-label={label}
      aria-pressed={on}
      title={label}
      onClick={() => {
        if (!supported) {
          show(t('toast.audio'));
          return;
        }
        void toggle();
      }}
    >
      <span className="sound-bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
    </IconButton>
  );
}
