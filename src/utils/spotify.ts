import axios from 'axios';
import qs from 'qs';

export function getSpotifyLoginUrl(token: string): string {
  const redirect_uri = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/callback`;

  const params = qs.stringify({
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    redirect_uri,
    state: token,
    scope: 'streaming user-read-email user-read-private',
  });

  return `https://accounts.spotify.com/authorize?${params}`;
}

export function refreshSpotifyToken(refreshToken: string): Promise<string> {
  return axios
    .post('/api/auth/refresh', { refreshToken })
    .then((res) => res.data.access_token);
}

export function getTokenFromPlayer(player: Spotify.Player): Promise<string> {
  return new Promise((res) => {
    player._options.getOAuthToken(res);
  });
}

export interface SpotifyAuthResponse {
  access_token: string;
  token_type: 'Bearer';
  scope: string;
  expires_in: number;
  refresh_token: string;
}

export function isSpotifyAuthResponse(
  obj: unknown,
): obj is SpotifyAuthResponse {
  return typeof obj === 'object' && obj !== null && 'access_token' in obj; // Unsound for sure, but okay for now.
}

interface SpotifyAudioAnalysisItem {
  start: number;
  duration: number;
  confidence: number;
}

interface SpotifyAudioAnalysisSection extends SpotifyAudioAnalysisItem {
  loudness: number;
  tempo: number;
  tempo_confidence: number;
  key: number;
  key_confidence: number;
  mode: number;
  mode_confidence: number;
  time_signature: number;
  time_signature_confidence: number;
}

interface SpotifyAudioAnalysisSegment extends SpotifyAudioAnalysisItem {
  loudness_start: number;
  loudness_max_time: number;
  loudness_max: number;
  loudness_end: number;
  pitches: number[];
  timbre: number[];
}

interface SpotifyAudioAnalysis {
  bars: SpotifyAudioAnalysisItem[];
  beats: SpotifyAudioAnalysisItem[];
  meta: any;
  sections: SpotifyAudioAnalysisSection[];
  segments: SpotifyAudioAnalysisSegment[]
}

function binarySearchLoudness(
  arr: Array<Pick<SpotifyAudioAnalysisSegment, 'loudness_max' | 'start'>>,
  position: number
): number {
  let lo = 0, hi = arr.length;
  while(lo < hi) {
    const mi = Math.floor((lo + hi) / 2)
    if(arr[mi].start < position) lo = mi + 1;
    else hi = mi;
  }
  return lo;
}

export function getCurrentLoudness(
  analysis: SpotifyAudioAnalysis,
  position: number,
) {
  const source = analysis.segments.map(({ loudness_max, start, duration }) => ({
    loudness_max,
    start,
    duration,
  }));
  const loudness = source[binarySearchLoudness(source, position / 1000)].loudness_max;
  return 1 - (Math.min(Math.max(loudness, -35), 0) / -35); // https://medium.com/swlh/creating-waveforms-out-of-spotify-tracks-b22030dd442b
}
