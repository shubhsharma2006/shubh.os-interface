export type Track = {
  id: string;
  title: string;
  artist: string;
  src: string;       // mp3/wav URL or blob: URL
  cover?: string;    // optional cover image URL
  duration?: number; // optional, fills after load
};

export const DEFAULT_TRACKS: Track[] = [];
