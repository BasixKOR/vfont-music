import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';
import { validateToken } from 'utils/csrfToken';
import type { SpotifyAuthResponse } from 'utils/spotify';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { state, error, code } = req.query;

  if (
    typeof state !== 'string' || // Type checker
    !validateToken(state) || // CSRF token validatation
    error || // Check any errors
    typeof code !== 'string' // Type checker
  ) {
    console.log({ state, error, code });
    res.redirect('/');
    return;
  }

  const params = qs.stringify({
    grant_type: 'authorization_code',
    code,
    redirect_uri: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/callback`,
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  const result = await axios.post<SpotifyAuthResponse>('https://accounts.spotify.com/api/token', params);

	res.redirect(`/play?${qs.stringify(result.data)}`);
}
