import { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';

interface Props {
  getCurrentTime: () => number;
  getDuration: () => number;
  onSeek: (t: number) => void;
  isPlaying: boolean;
}

export default function SeekBar({ getCurrentTime, getDuration, onSeek, isPlaying }: Props) {
  const [now, setNow] = useState(0);
  const [dur, setDur] = useState(0);
  const [scrubbing, setScrubbing] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setNow(getCurrentTime());
      setDur(getDuration());
    }, 250);
    return () => clearInterval(id);
  }, [getCurrentTime, getDuration, isPlaying]);

  const value = scrubbing ?? now;

  return (
    <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground tabular-nums">
      <span className="w-9 text-right">{fmt(value)}</span>
      <Slider
        value={[value]}
        min={0}
        max={Math.max(dur, 0.1)}
        step={0.1}
        onValueChange={(v) => setScrubbing(v[0])}
        onValueCommit={(v) => {
          onSeek(v[0]);
          setScrubbing(null);
        }}
        className="flex-1"
      />
      <span className="w-9">{fmt(dur)}</span>
    </div>
  );
}

function fmt(s: number) {
  if (!isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${ss}`;
}
