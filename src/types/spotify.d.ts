interface SpotifyPlayerInitializer {
  name: string;
  getOAuthToken: (cb: (token: string) => void) => void;
  volume?: number;
}

interface WebPlaybackPlayer {
  device_id: string;
}

interface WebPlaybackState {
  context: {
    uri: string;
    metadata: any;
  };
  disallows: {
    pausing: boolean;
    peeking_next: boolean;
    peeking_prev: boolean;
    resuming: boolean;
    seeking: boolean;
    skipping_next: boolean;
    skipping_prev: boolean;
  };
  paused: boolean;
  position: number;
  repeat_mode: 0 | 1 | 2;
  shuffle: boolean;
  track_window: {
    current_track: WebPlaybackTrack;
    previous_tracks: WebPlaybackTrack[];
    next_tracks: WebPlaybackTrack[];
  };
}

interface WebPlaybackTrack {
  uri: string;
  id: string;
  type: 'track' | 'episode' | 'ad';
  media_type: 'audio' | 'video';
  name: string;
  is_playable: true;
  album: {
    uri: string;
    name: string;
    images: Array<{ url: string }>;
  };
  artists: Array<{
    uri: string;
    name: string;
  }>;
}

interface WebPlaybackError {
  message: string;
}

type Events = {
  ready: WebPlaybackPlayer;
  not_ready: WebPlaybackPlayer;
  player_state_changed: WebPlaybackState;
  initialization_error: WebPlaybackError;
  authentication_error: WebPlaybackError;
  account_error: WebPlaybackError;
  playback_error: WebPlaybackError;
};

interface GlobalEventHandlers {
  onSpotifyWebPlaybackSDKReady: (() => void) | null;
}

declare namespace Spotify {
  declare class Player {
    constructor(params: SpotifyPlayerInitializer);
    connect: () => Promise<boolean>;
    disconnect: () => void;
    addListener: <E extends keyof Events>(
      event: E,
      cb: (obj: Events[E]) => void,
    ) => boolean;
    on: <E extends keyof Events>(
      event: E,
      cb: (obj: Events[E]) => void,
    ) => boolean;
    removeListener: <E extends keyof Events>(
      event: E,
      cb?: (obj: Events[E]) => void,
    ) => boolean;
    getCurrentState: () => Promise<WebPlaybackState | null>;
    setName: () => Promise<void>;
    getVolume: () => Promise<number>;
    setVolume: () => Promise<void>;
    pause: () => Promise<void>;
    resume: () => Promise<void>;
    togglePlay: () => Promise<void>;
    seek: () => Promise<void>;
    previousTrack: () => Promise<void>;
    nextTrack: () => Promise<void>;
    nextTrack: () => Promise<void>;
  }
}

declare let;
