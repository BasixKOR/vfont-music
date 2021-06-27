import { useCallback, useEffect, useRef, useState } from 'react';
import { refreshSpotifyToken } from 'utils/spotify';

type Listener = {
  [key in keyof SpotifyPlayerEvents]?: (obj: SpotifyPlayerEvents[key]) => void;
};

export default function useSpotifyPlayer(
  refreshToken: string,
  listener: Listener,
) {
  const [isLoadedOnce, setLoadedOnce] = useState(false);
  const player = useRef<Spotify.Player>();

  const init = useCallback(() => {
    player.current = new Spotify.Player({
      name: 'vfont-music',
      getOAuthToken: (cb) => refreshSpotifyToken(refreshToken).then(cb),
    });

    Object.keys(listener).forEach((key) => {
      player.current?.addListener(
        key as keyof SpotifyPlayerEvents,
        listener[key as keyof SpotifyPlayerEvents] as any,
      );
    });

    // Connect to the player!
    player.current?.connect();
    setLoadedOnce(true);
  }, [listener, refreshToken])

  useEffect(() => {
    if(!isLoadedOnce) window.onSpotifyWebPlaybackSDKReady = init;
  }, [isLoadedOnce, init]);

  return player;
}
