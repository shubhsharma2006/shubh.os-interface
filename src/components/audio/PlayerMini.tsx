import { Play, Pause, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAudioStore } from '@/hooks/useAudioStore';

interface Props {
  isPlaying: boolean;
  onPlayPause: () => void;
}

export default function PlayerMini({ isPlaying, onPlayPause }: Props) {
  const { toggleExpanded, tracks, currentIndex } = useAudioStore();
  const track = tracks[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex items-center gap-2 rounded-full glass holo-border p-1.5 pr-3 shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.5)]"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPlayPause();
        }}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
      </button>
      <button
        onClick={toggleExpanded}
        className="flex items-center gap-2 text-left max-w-[180px]"
      >
        <Music className="h-3.5 w-3.5 text-primary shrink-0" />
        <span className="truncate text-xs font-medium text-foreground">
          {track?.title ?? 'Open player'}
        </span>
      </button>
    </motion.div>
  );
}
