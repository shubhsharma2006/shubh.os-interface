import { useRef } from 'react';
import { Upload, Trash2, Music, Link as LinkIcon } from 'lucide-react';
import { useAudioStore } from '@/hooks/useAudioStore';
import type { Track } from '@/lib/tracks';
import { cn } from '@/lib/utils';

export default function Playlist() {
  const {
    tracks,
    currentIndex,
    setCurrentIndex,
    setIsPlaying,
    addTracks,
    removeTrack,
  } = useAudioStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const newTracks: Track[] = Array.from(files)
      .filter((f) => f.type.startsWith('audio/'))
      .map((f) => ({
        id: `${f.name}-${f.size}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title: f.name.replace(/\.[^.]+$/, ''),
        artist: 'Local file',
        src: URL.createObjectURL(f),
      }));
    if (newTracks.length) addTracks(newTracks);
  };

  const addUrl = () => {
    const v = urlRef.current?.value.trim();
    if (!v) return;
    const t: Track = {
      id: `url-${Date.now()}`,
      title: decodeURIComponent(v.split('/').pop() || 'Stream').replace(/\.[^.]+$/, ''),
      artist: new URL(v, location.href).hostname,
      src: v,
    };
    addTracks([t]);
    if (urlRef.current) urlRef.current.value = '';
  };

  return (
    <div
      className="flex flex-col gap-3"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        onFiles(e.dataTransfer.files);
      }}
    >
      <div className="flex gap-2">
        <button
          onClick={() => fileRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-2 rounded-md border border-border bg-surface/60 px-3 py-2 text-xs font-medium text-foreground hover:border-primary/40 hover:bg-surface transition-colors"
        >
          <Upload className="h-3.5 w-3.5" /> Upload songs
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="audio/*"
          multiple
          className="hidden"
          onChange={(e) => {
            onFiles(e.target.files);
            e.currentTarget.value = '';
          }}
        />
      </div>

      <div className="flex items-center gap-1.5 rounded-md border border-border bg-surface/60 pl-2">
        <LinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
        <input
          ref={urlRef}
          placeholder="Paste audio URL (mp3/wav/m4a)…"
          className="flex-1 bg-transparent py-2 text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
          onKeyDown={(e) => e.key === 'Enter' && addUrl()}
        />
        <button
          onClick={addUrl}
          className="rounded-md px-2 py-1 text-[10px] font-medium text-primary hover:bg-primary/10"
        >
          Add
        </button>
      </div>

      <div className="max-h-56 overflow-y-auto rounded-md border border-border bg-surface/40">
        {tracks.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-3 py-6 text-center text-xs text-muted-foreground">
            <Music className="h-5 w-5 opacity-50" />
            <span>Drop files here or upload to start</span>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {tracks.map((t, i) => (
              <li
                key={t.id}
                className={cn(
                  'group flex items-center gap-2 px-3 py-2 text-xs cursor-pointer hover:bg-white/5',
                  i === currentIndex && 'bg-primary/10'
                )}
                onClick={() => {
                  setCurrentIndex(i);
                  setIsPlaying(true);
                }}
              >
                <span
                  className={cn(
                    'w-5 text-center font-mono text-[10px]',
                    i === currentIndex ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {i === currentIndex ? '▶' : i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-foreground">{t.title}</div>
                  <div className="truncate text-[10px] text-muted-foreground">{t.artist}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (t.src.startsWith('blob:')) URL.revokeObjectURL(t.src);
                    removeTrack(t.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition"
                  title="Remove"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
