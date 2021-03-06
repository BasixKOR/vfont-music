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
          paused={state.paused}
          player={player}
        />
      )}
      <p className="text-9xl text-center transition-all" ref={ref}>{state.track_window.current_track.name}</p>
    </main>
  );
}
