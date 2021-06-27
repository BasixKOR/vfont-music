import { Ref } from "react";

interface TrackInfoProps {
  currentTrack: WebPlaybackTrack;
  player: Ref<Spotify.Player | undefined>;
}

/* eslint-disable @next/next/no-img-element */
export default function TrackInfo({ currentTrack }: TrackInfoProps) {
  return (
    <div className="flex h-24 lg:absolute bottom-5 left-5">
      <img
        className="object-scale-down object-left shadow-md hover:shadow-lg rounded-md"
        src={currentTrack.album.images[0].url}
        alt={currentTrack.album.name}
        height=""
      />
      <div className="flex-1 ml-5">
        <p className="font-bold">{currentTrack.name}</p>
        <p>{currentTrack.artists[0].name}</p>
      </div>
    </div>
  );
}
