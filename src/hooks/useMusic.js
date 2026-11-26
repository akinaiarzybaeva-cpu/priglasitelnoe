import { useCallback, useEffect, useRef, useState } from 'react';
import { asset } from '../utils';

/**
 * Фондук музыканы башкаруу.
 * Браузерлер үнү бар музыканы колдонуучу баскандан кийин гана ойнотууга уруксат беришет,
 * ошондуктан play() дайыма баскычты басуу ичинде чакырылат.
 */
export default function useMusic({ src, volume = 0.6 }) {
  const audioRef = useRef(null);
  const resumeRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  if (!audioRef.current && typeof Audio !== 'undefined') {
    const audio = new Audio(asset(src));
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = volume;
    audioRef.current = audio;
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => {
      setError(true);
      setPlaying(false);
    };
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    // Башка вкладкага өткөндө музыка токтойт, кайтканда улантылат
    const onVisibility = () => {
      if (document.hidden) {
        resumeRef.current = !audio.paused;
        audio.pause();
      } else if (resumeRef.current) {
        audio.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      document.removeEventListener('visibilitychange', onVisibility);
      audio.pause();
    };
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(() => setPlaying(false));
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) play();
    else audio.pause();
  }, [play]);

  return { playing, error, play, toggle };
}
