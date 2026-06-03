import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { useAudioStore } from '@/hooks/useAudioStore';
import PlayerMini from './PlayerMini';
import PlayerPanel from './PlayerPanel';

export default function AudioPlayer() {
  const engine = useAudioEngine();
  const {
    expanded,
    isPlaying,
    setIsPlaying,
    tracks,
    setVolume,
    volume,
    toggleMute,
    next,
    prev,
  } = useAudioStore();

  const onPlayPause = () => {
    if (!tracks.length) {
      useAudioStore.getState().setExpanded(true);
      useAudioStore.getState().togglePlaylist();
      return;
    }
    engine.ensureContext();
    setIsPlaying(!isPlaying);
  };

  // Keyboard shortcuts (skip while typing)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tgt = e.target as HTMLElement;
      if (tgt && (tgt.tagName === 'INPUT' || tgt.tagName === 'TEXTAREA' || tgt.isContentEditable))
        return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case ' ':
          e.preventDefault();
          onPlayPause();
          break;
        case 'ArrowRight':
          engine.seek(Math.min(engine.getDuration(), engine.getCurrentTime() + 5));
          break;
        case 'ArrowLeft':
          engine.seek(Math.max(0, engine.getCurrentTime() - 5));
          break;
        case 'ArrowUp':
          setVolume(Math.min(1, volume + 0.05));
          break;
        case 'ArrowDown':
          setVolume(Math.max(0, volume - 0.05));
          break;
        case 'm':
        case 'M':
          toggleMute();
          break;
        case 'n':
        case 'N':
          next();
          break;
        case 'p':
        case 'P':
          prev();
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, volume, tracks.length]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="wait">
        {expanded ? (
          <PlayerPanel
            key="panel"
            analyser={engine.analyser}
            isPlaying={isPlaying}
            onPlayPause={onPlayPause}
            getCurrentTime={engine.getCurrentTime}
            getDuration={engine.getDuration}
            onSeek={engine.seek}
          />
        ) : (
          <PlayerMini key="mini" isPlaying={isPlaying} onPlayPause={onPlayPause} />
        )}
      </AnimatePresence>
    </div>
  );
}
