import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Track } from '@/lib/tracks';

type RepeatMode = 'off' | 'one' | 'all';

interface AudioState {
  tracks: Track[];
  currentIndex: number;
  isPlaying: boolean;
  expanded: boolean;
  showPlaylist: boolean;
  volume: number;
  muted: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  lastPosition: number;

  addTracks: (t: Track[]) => void;
  removeTrack: (id: string) => void;
  clearTracks: () => void;
  setCurrentIndex: (i: number) => void;
  setIsPlaying: (b: boolean) => void;
  setExpanded: (b: boolean) => void;
  toggleExpanded: () => void;
  togglePlaylist: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  setLastPosition: (n: number) => void;
  next: () => void;
  prev: () => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set, get) => ({
      tracks: [],
      currentIndex: 0,
      isPlaying: false,
      expanded: false,
      showPlaylist: false,
      volume: 0.8,
      muted: false,
      shuffle: false,
      repeat: 'off',
      lastPosition: 0,

      addTracks: (t) => set((s) => ({ tracks: [...s.tracks, ...t] })),
      removeTrack: (id) =>
        set((s) => {
          const idx = s.tracks.findIndex((x) => x.id === id);
          if (idx === -1) return s;
          const tracks = s.tracks.filter((x) => x.id !== id);
          let currentIndex = s.currentIndex;
          if (idx < currentIndex) currentIndex--;
          else if (idx === currentIndex) currentIndex = Math.min(currentIndex, tracks.length - 1);
          return { tracks, currentIndex: Math.max(0, currentIndex) };
        }),
      clearTracks: () => set({ tracks: [], currentIndex: 0, isPlaying: false }),
      setCurrentIndex: (i) => set({ currentIndex: i, lastPosition: 0 }),
      setIsPlaying: (b) => set({ isPlaying: b }),
      setExpanded: (b) => set({ expanded: b }),
      toggleExpanded: () => set((s) => ({ expanded: !s.expanded })),
      togglePlaylist: () => set((s) => ({ showPlaylist: !s.showPlaylist })),
      setVolume: (v) => set({ volume: Math.max(0, Math.min(1, v)), muted: false }),
      toggleMute: () => set((s) => ({ muted: !s.muted })),
      toggleShuffle: () => set((s) => ({ shuffle: !s.shuffle })),
      cycleRepeat: () =>
        set((s) => ({ repeat: s.repeat === 'off' ? 'all' : s.repeat === 'all' ? 'one' : 'off' })),
      setLastPosition: (n) => set({ lastPosition: n }),
      next: () => {
        const { tracks, currentIndex, shuffle } = get();
        if (!tracks.length) return;
        const i = shuffle
          ? Math.floor(Math.random() * tracks.length)
          : (currentIndex + 1) % tracks.length;
        set({ currentIndex: i, lastPosition: 0, isPlaying: true });
      },
      prev: () => {
        const { tracks, currentIndex } = get();
        if (!tracks.length) return;
        const i = (currentIndex - 1 + tracks.length) % tracks.length;
        set({ currentIndex: i, lastPosition: 0, isPlaying: true });
      },
    }),
    {
      name: 'shubh-audio-player',
      partialize: (s) => ({
        // Persist only metadata for URL tracks; blob: URLs won't survive reloads, drop them.
        tracks: s.tracks.filter((t) => !t.src.startsWith('blob:')),
        currentIndex: s.currentIndex,
        volume: s.volume,
        muted: s.muted,
        shuffle: s.shuffle,
        repeat: s.repeat,
        lastPosition: s.lastPosition,
      }),
    }
  )
);
