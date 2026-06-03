# Ambient Audio Player + RGB Visualizer — Full Plan

A floating, premium audio player for the portfolio with an RGB reactive visualizer, blurred album-art background, and full transport controls. Pure frontend (Web Audio API + Canvas) — no backend changes.

## What you get

1. **Floating mini-player** (bottom-right, glassmorphism) — always visible, collapsible.
2. **Expanded player panel** — full controls + visualizer.
3. **RGB Audio Visualizer** — frequency bars / radial waveform driven by `AnalyserNode`, colored by the theme's electric blue → violet → cyan gradient, reacting in real time.
4. **Blurred background art** — current track cover, scaled + heavily blurred behind the visualizer for the "Apple Music" depth feel.
5. **Full transport** — play/pause, prev/next, seek scrubber, time display, volume slider w/ mute, shuffle, repeat.
6. **Playlist drawer** — list of tracks with active highlight + click-to-play.
7. **Keyboard shortcuts** — Space (play/pause), ←/→ (seek 5s), ↑/↓ (volume), M (mute), N (next), P (prev).
8. **Persistence** — last track, volume, position saved to `localStorage`.
9. **Respects `prefers-reduced-motion**` — visualizer falls back to static gradient.

## Structure

```text
src/
├── components/audio/
│   ├── AudioPlayer.tsx          # Main wrapper, mounted in App.tsx
│   ├── PlayerMini.tsx           # Collapsed floating bubble
│   ├── PlayerPanel.tsx          # Expanded panel (controls + visualizer)
│   ├── TransportControls.tsx    # Play/pause/prev/next/shuffle/repeat
│   ├── SeekBar.tsx              # Scrubber + time
│   ├── VolumeControl.tsx        # Slider + mute
│   ├── Playlist.tsx             # Track list drawer
│   ├── RGBVisualizer.tsx        # Canvas-based frequency visualizer
│   └── BlurredArtBackground.tsx # Cover-art backdrop
├── hooks/
│   ├── useAudioEngine.ts        # HTMLAudioElement + AudioContext + AnalyserNode
│   └── useAudioStore.ts         # Zustand store for player state
└── lib/
    └── tracks.ts                # Track metadata (title, artist, src, cover)
```

## Technical details

**Audio engine (`useAudioEngine.ts`)**

- Single `HTMLAudioElement` (ref). On first user interaction, create `AudioContext`, `MediaElementSource`, and `AnalyserNode` (fftSize 256, smoothingTimeConstant 0.8). Connect: source → analyser → destination.
- Expose: `play`, `pause`, `seek`, `setVolume`, `next`, `prev`, current `analyser` node, `currentTime`, `duration`, `isPlaying`.
- `crossOrigin = "anonymous"` so external CDN tracks work with the analyser.

**State (`useAudioStore.ts` — Zustand, light addition)**

- `tracks`, `currentIndex`, `isPlaying`, `volume`, `muted`, `shuffle`, `repeat`, `expanded`.
- Hydrate from `localStorage` on mount; persist on change.

**RGB Visualizer (`RGBVisualizer.tsx`)**

- `requestAnimationFrame` loop reads `analyser.getByteFrequencyData(Uint8Array)`.
- Renders 64 bars on `<canvas>` with HSL hue interpolated across the theme palette (uses CSS vars `--primary`, `--secondary`, `--accent`). Each bar height = `value/255 * canvasHeight`, with mirrored reflection and a soft additive glow (`globalCompositeOperation = 'lighter'`).
- Pauses RAF when tab hidden (Page Visibility API) and when player is paused.

**Blurred art background**

- `<div>` with `background-image: url(cover)`, `filter: blur(60px) saturate(140%)`, `transform: scale(1.2)`, opacity 0.6. Crossfades on track change with framer-motion.

**Controls**

- Use existing shadcn `Slider` for seek + volume.
- Lucide icons: `Play`, `Pause`, `SkipBack`, `SkipForward`, `Volume2`, `VolumeX`, `Shuffle`, `Repeat`, `ListMusic`, `ChevronDown`.

**Styling**

- All colors via existing semantic tokens (`bg-surface`, `text-foreground`, `border-border`, `text-primary`, etc.). Reuse `.glass` and `.holo-border` utilities from `index.css`.
- Container: `fixed bottom-6 right-6 z-50`. Expanded width 380px on desktop, full-width sheet on mobile (`useIsMobile`).

**Mount**

- Add `<AudioPlayer />` in `src/App.tsx` next to `<CommandPalette />` so it's globally available.

**Tracks**

- `src/lib/tracks.ts` seeded with 3–4 royalty-free ambient/lo-fi tracks (e.g. Pixabay / Free Music Archive direct mp3 URLs) + cover image URLs. You can swap in your own later.

## Dependencies

- `zustand` (new — small, ~1KB)
- `framer-motion`, `lucide-react`, shadcn `Slider`, `Sheet` — already installed.

## Out of scope

- No uploads, no backend, no auth.
- No lyrics, no equalizer presets.
- Not touching existing portfolio sections.

## Open question

Should I seed it with **royalty-free sample tracks** (Pixabay ambient) so it works immediately, or leave `tracks.ts` empty for you to fill in your own URLs? Default: seed with samples.  
no free tracks direct through youtube or any other app or uplod songs option

&nbsp;