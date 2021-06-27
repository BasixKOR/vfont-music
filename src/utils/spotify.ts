import axios from 'axios';
import qs from 'qs'

export function getSpotifyLoginUrl(token: string): string {
  const redirect_uri = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/callback`;

  const params = qs.stringify({
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    redirect_uri,
    state: token,
    scope: 'streaming user-read-email user-read-private'
  })

  return `https://accounts.spotify.com/authorize?${params}`;
}

export function refreshSpotifyToken(refreshToken: string): Promise<string> {
  return axios.post('/api/auth/refresh', { refreshToken }).then(res => res.data.access_token)
}

export function getTokenFromPlayer(player: Spotify.Player): Promise<string> {
  return new Promise(res => {
    player._options.getOAuthToken(res)
  }) 
}

export interface SpotifyAuthResponse {
  access_token: string;
  token_type: 'Bearer';
  scope: string;
  expires_in: number;
  refresh_token: string;
}

export function isSpotifyAuthResponse(obj: unknown): obj is SpotifyAuthResponse {
  return typeof obj === 'object' && obj !== null && 'access_token' in obj; // Unsound for sure, but okay for now.
}