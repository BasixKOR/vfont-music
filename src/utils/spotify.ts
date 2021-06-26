export function getSpotifyLoginUrl(token: string): string {
  const redirectUri = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/callback`;

  return `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&state=${token}&scope=user-read-playback-state`;
}
