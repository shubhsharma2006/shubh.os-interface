import { ChevronDown, ListMusic, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAudioStore } from '@/hooks/useAudioStore';
import RGBVisualizer from './RGBVisualizer';
import BlurredArtBackground from './BlurredArtBackground';
import TransportControls from './TransportControls';
import SeekBar from './SeekBar';
import VolumeControl from './VolumeControl';
import Playlist from './Playlist';

interface Props {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  onSeek: (t: number) => void;
}

export default function PlayerPanel({
  analyser,
  isPlaying,
  onPlayPause,
  getCurrentTime,
  getDuration,
  onSeek,
}: Props) {
  const { tracks, currentIndex, toggleExpanded, showPlaylist, togglePlaylist } = useAudioStore();
  const track = tracks[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl glass holo-border shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.4)]"
    >
      <BlurredArtBackground cover={track?.cover} />

      <div className="relative z-10 flex flex-col gap-3 p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            ◉ now playing
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={togglePlaylist}
              className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-white/5"
              title="Playlist"
            >
              <ListMusic className="h-4 w-4" />
            </button>
            <button
              onClick={toggleExpanded}
              className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-white/5"
              title="Collapse"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Title row */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg bg-surface-2 border border-border">
            {track?.cover ? (
              <img src={track.cover} alt="" className="h-full w-full object-cover" />
            ) : (
              <Music className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-display text-sm font-semibold text-foreground">
              {track?.title ?? 'No track loaded'}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {track?.artist ?? 'Upload a song or paste a URL'}
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="relative h-20 overflow-hidden rounded-lg border border-border bg-background/40">
          <RGBVisualizer
            analyser={analyser}
            isPlaying={isPlaying}
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* Seek */}
        <SeekBar
          getCurrentTime={getCurrentTime}
          getDuration={getDuration}
          onSeek={onSeek}
          isPlaying={isPlaying}
        />

        {/* Transport */}
        <TransportControls onPlayPause={onPlayPause} />

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <VolumeControl />
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
            {tracks.length} track{tracks.length === 1 ? '' : 's'}
          </div>
        </div>

        {/* Playlist */}
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-2 border-t border-border"
          >
            <Playlist />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
