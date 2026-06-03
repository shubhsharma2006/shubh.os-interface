import { useEffect, useRef } from 'react';
import { useAudioStore } from './useAudioStore';

/**
 * Singleton-ish audio engine. Mounts a single <audio> element via ref,
 * sets up Web Audio analyser on first play, and wires store -> element.
 */
export function useAudioEngine() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const currentTimeRef = useRef(0);
  const durationRef = useRef(0);

  const {
    tracks,
    currentIndex,
    isPlaying,
    volume,
    muted,
    repeat,
    setIsPlaying,
    next,
    setLastPosition,
  } = useAudioStore();

  const track = tracks[currentIndex];

  // Create audio element once
  useEffect(() => {
    if (audioRef.current) return;
    const el = new Audio();
    el.crossOrigin = 'anonymous';
    el.preload = 'metadata';
    audioRef.current = el;

    const onTime = () => {
      currentTimeRef.current = el.currentTime;
    };
    const onDur = () => {
      durationRef.current = el.duration || 0;
    };
    const onEnd = () => {
      const { repeat: r } = useAudioStore.getState();
      if (r === 'one') {
        el.currentTime = 0;
        el.play().catch(() => {});
      } else {
        useAudioStore.getState().next();
      }
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    el.addEventListener('timeupdate', onTime);
    el.addEventListener('loadedmetadata', onDur);
    el.addEventListener('ended', onEnd);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);

    return () => {
      el.pause();
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('loadedmetadata', onDur);
      el.removeEventListener('ended', onEnd);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load new track when index/src changes
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !track) return;
    if (el.src !== track.src) {
      el.src = track.src;
      el.load();
    }
    if (isPlaying) {
      ensureContext();
      el.play().catch(() => setIsPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track?.src]);

  // Play / pause sync
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !track) return;
    if (isPlaying) {
      ensureContext();
      el.play().catch(() => setIsPlaying(false));
    } else {
      el.pause();
      setLastPosition(el.currentTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  // Volume sync
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // Repeat mode: 'one' uses loop natively too
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.loop = repeat === 'one';
  }, [repeat]);

  function ensureContext() {
    const el = audioRef.current;
    if (!el) return;
    if (!ctxRef.current) {
      try {
        const Ctx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new Ctx();
        const source = ctx.createMediaElementSource(el);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        source.connect(analyser);
        analyser.connect(ctx.destination);
        ctxRef.current = ctx;
        sourceRef.current = source;
        analyserRef.current = analyser;
      } catch (e) {
        // Source already connected or CORS — visualizer just won't react.
        console.warn('[audio] analyser init failed', e);
      }
    }
    if (ctxRef.current?.state === 'suspended') ctxRef.current.resume();
  }

  return {
    audioEl: audioRef.current,
    analyser: analyserRef.current,
    ensureContext,
    seek: (t: number) => {
      const el = audioRef.current;
      if (!el) return;
      el.currentTime = t;
    },
    getCurrentTime: () => audioRef.current?.currentTime ?? 0,
    getDuration: () => audioRef.current?.duration ?? 0,
  };
}
