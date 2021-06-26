import qs from 'qs'

export function getSpotifyLoginUrl(token: string): string {
  const redirect_uri = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/callback`;

  const params = qs.stringify({
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    redirect_uri,
    state: 'token',
    scope: 'user-read-playback-state'
  })

  return `https://accounts.spotify.com/authorize?${params}`;
}
