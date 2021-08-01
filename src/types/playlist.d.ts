export interface Playlist {
  name: string;
  url: string;
}

export interface PlaylistDetails {
  limit: number;
  genres: string[];
  artists?: string[];
  minAcoustic?: number;
  maxAcoustic?: number;
  minDanceability?: number;
  maxDanceability?: number;
  minDuration?: number;
  maxDuration?: number;
  minEnergy?: number;
  maxEnergy?: number;
  minInstrumentalness?: number;
  maxInstrumentalness?: number;
  minKey?: number;
  maxKey?: number;
  minLiveness?: number;
  maxLiveness?: number;
  minLoudness?: number;
  maxLoudness?: number;
  minPopularity?: number;
  maxPopularity?: number;
  minTempo?: number;
  maxTempo?: number;
  minValence?: number;
  maxValence?: number;
}
