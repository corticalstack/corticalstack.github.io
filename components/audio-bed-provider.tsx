"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface AudioBedContextValue {
  available: boolean;
  audioOn: boolean;
  toggle: () => void;
}

const AudioBedContext = createContext<AudioBedContextValue>({
  available: false,
  audioOn: false,
  toggle: () => {},
});

export function useAudioBed() {
  return useContext(AudioBedContext);
}

interface AudioBedProviderProps {
  playlist: string[];
  children: ReactNode;
}

/**
 * Owns the section-wide audio bed. Lives in the root layout so the <audio>
 * element survives client-side navigation - audio keeps playing as the user
 * moves between /, /transmissions, /archives etc.
 *
 * Consumers (currently just SelectedWorksConsole) call useAudioBed() to read
 * state and trigger the toggle. Defaults paused (browser autoplay-with-sound
 * policy); the first toggle counts as user interaction.
 */
export function AudioBedProvider({ playlist, children }: AudioBedProviderProps) {
  const [audioOn, setAudioOn] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = playlist[trackIndex];

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !audioOn) return;
    el.play().catch(() => {});
  }, [trackIndex, audioOn]);

  const handleTrackEnded = () => {
    if (playlist.length === 0) return;
    setTrackIndex((i) => (i + 1) % playlist.length);
  };

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (audioOn) {
      el.pause();
      setAudioOn(false);
    } else {
      el.play()
        .then(() => setAudioOn(true))
        .catch(() => setAudioOn(false));
    }
  };

  return (
    <AudioBedContext.Provider
      value={{ available: playlist.length > 0, audioOn, toggle }}
    >
      {currentTrack ? (
        <audio
          ref={audioRef}
          src={currentTrack}
          preload="metadata"
          onEnded={handleTrackEnded}
          aria-hidden="true"
        />
      ) : null}
      {children}
    </AudioBedContext.Provider>
  );
}
