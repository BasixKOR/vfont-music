import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";
import { SpotifyAuthResponse } from "utils/spotify";

type Data = Omit<SpotifyAuthResponse, 'refresh_token'>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
	const auth = Buffer.from(`${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')
	const result = await axios.post<Data>('https://accounts.spotify.com/api/token', qs.stringify({
    grant_type: 'refresh_token',
    refresh_token: req.body.refreshToken
  }), {
		headers: {
			Authorization: `Basic ${auth}`
		}
	})
	res.json(result.data);
}