import { Ref } from 'react';
import TrackInfo from 'components/TrackInfo';

interface PlayViewProps {
  state: WebPlaybackState;
  player: Ref<Spotify.Player | undefined>;
}

export default function PlayView({ state, player }: PlayViewProps) {
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
    </main>
  );
}
