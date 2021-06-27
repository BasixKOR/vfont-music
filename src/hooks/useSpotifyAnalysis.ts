import { RefObject, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { getCurrentLoudness, getTokenFromPlayer } from 'utils/spotify';

const spotify = new SpotifyWebApi();

export default function useSpotifyAnalysis(
  trackId: string,
  ref: RefObject<HTMLParagraphElement | null>,
  player: RefObject<Spotify.Player | undefined>,
) {
  useEffect(() => {
    if (!ref.current || !player.current) return;
    async function handle() {
      spotify.setAccessToken(await getTokenFromPlayer(player.current!));
      const analysis = await spotify.getAudioAnalysisForTrack(trackId);
      async function rafHandle() {
				const state = await player.current?.getCurrentState();
				if(!state) return requestAnimationFrame(rafHandle);
        const loudness = getCurrentLoudness(analysis, state.position);
        ref.current?.style?.setProperty('font-variation-settings', `'wght' ${loudness * 800 + 100}`)
        requestAnimationFrame(rafHandle);
      }
      requestAnimationFrame(rafHandle);
    }
    handle();
  }, [player, ref, trackId]);
}
