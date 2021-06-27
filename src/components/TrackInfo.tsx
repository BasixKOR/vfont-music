import { RefObject } from 'react';

interface TrackInfoProps {
  currentTrack: WebPlaybackTrack;
  player: RefObject<Spotify.Player | undefined>;
  paused: boolean;
}

/* eslint-disable @next/next/no-img-element */
export default function TrackInfo({
  currentTrack,
  paused,
  player,
}: TrackInfoProps) {
  return (
    <div className="flex h-24 lg:absolute bottom-5 left-5">
      <div className="w-24 h-24 rounded-md shadow-md hover:shadow-lg transition-shadow flex-initial">
        <img
          className="object-cover inset-0 relative"
          src={currentTrack.album.images[0].url}
          alt={currentTrack.album.name}
          height=""
        />
        <div
          role="button"
          className="absolute opacity-0 hover:opacity-40 transition-opacity rounded-md bottom-0 w-24 h-full bg-black flex text-center text-4xl justify-center items-center text-white"
          onClick={() => {
            player.current?.togglePlay();
          }}
        >
          <i className={`la ${paused ? 'la-play' : 'la-pause'} opacity-100`}></i>
        </div>
      </div>
      <div className="flex-1 ml-5">
        <p className="font-bold">{currentTrack.name}</p>
        <p>{currentTrack.artists[0].name}</p>
      </div>
    </div>
  );
}
