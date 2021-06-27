import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { isSpotifyAuthResponse, SpotifyAuthResponse } from 'utils/spotify';
import Script from 'next/script';
import useSpotifyPlayer from 'hooks/useSpotifyPlayer';
import { useState } from 'react';
import PlayView from 'components/PlayView';

type PlayProps = SpotifyAuthResponse;

export default function Play(props: PlayProps) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<WebPlaybackState | null>(null);

  const player = useSpotifyPlayer(props.refresh_token, {
    ready: () => setReady(true),
    player_state_changed: (state) => setState(state),
  });

  return (
    <>
      <Script src="https://sdk.scdn.co/spotify-player.js" />
      {ready && state && <PlayView state={state} player={player} />}
    </>
  );
}

export function getServerSideProps(
  context: GetServerSidePropsContext,
): GetServerSidePropsResult<PlayProps> {
  const query: unknown = context.query;

  if (isSpotifyAuthResponse(query)) {
    return {
      props: query,
    };
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
