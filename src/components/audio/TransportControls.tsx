import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAudioStore } from '@/hooks/useAudioStore';

interface Props {
  onPlayPause: () => void;
}

export default function TransportControls({ onPlayPause }: Props) {
  const { isPlaying, next, prev, shuffle, toggleShuffle, repeat, cycleRepeat, tracks } =
    useAudioStore();
  const disabled = tracks.length === 0;

  return (
    <div className="flex items-center justify-center gap-2">
      <IconBtn onClick={toggleShuffle} active={shuffle} title="Shuffle">
        <Shuffle className="h-4 w-4" />
      </IconBtn>
      <IconBtn onClick={prev} disabled={disabled} title="Previous">
        <SkipBack className="h-4 w-4" />
      </IconBtn>
      <button
        onClick={onPlayPause}
        disabled={disabled}
        title={isPlaying ? 'Pause' : 'Play'}
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-full',
          'bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground',
          'shadow-[0_0_24px_hsl(var(--primary)/0.5)] transition-transform',
          'hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100'
        )}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
      </button>
      <IconBtn onClick={next} disabled={disabled} title="Next">
        <SkipForward className="h-4 w-4" />
      </IconBtn>
      <IconBtn onClick={cycleRepeat} active={repeat !== 'off'} title={`Repeat: ${repeat}`}>
        {repeat === 'one' ? <Repeat1 className="h-4 w-4" /> : <Repeat className="h-4 w-4" />}
      </IconBtn>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  active,
  disabled,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
        'text-muted-foreground hover:text-foreground hover:bg-white/5',
        active && 'text-primary',
        disabled && 'opacity-40 pointer-events-none'
      )}
    >
      {children}
    </button>
  );
}
