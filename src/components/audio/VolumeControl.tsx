import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useAudioStore } from '@/hooks/useAudioStore';

export default function VolumeControl() {
  const { volume, muted, setVolume, toggleMute } = useAudioStore();
  const Icon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleMute}
        className="text-muted-foreground hover:text-foreground transition-colors"
        title={muted ? 'Unmute' : 'Mute'}
      >
        <Icon className="h-4 w-4" />
      </button>
      <Slider
        value={[muted ? 0 : volume * 100]}
        max={100}
        step={1}
        onValueChange={(v) => setVolume(v[0] / 100)}
        className="w-20"
      />
    </div>
  );
}
