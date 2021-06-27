import { RefObject, useRef } from 'react';
import TrackInfo from 'components/TrackInfo';
import useSpotifyAnalysis from 'hooks/useSpotifyAnalysis';

interface PlayViewProps {
  state: WebPlaybackState;
  player: RefObject<Spotify.Player | undefined>;
}

export default function PlayView({ state, player }: PlayViewProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  useSpotifyAnalysis(state.track_window.current_track.id, ref, player)

  return (
    <main
      className="w-screen h-screen flex flex-col justify-center content-center relative"
    >
      {state && (
        <TrackInfo
          currentTrack={state.track_window.current_track}
          player={player}
        />
      )}
      <p className="text-4xl text-center" ref={ref}></p>
    </main>
  );
}
