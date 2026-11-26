import { motion } from 'framer-motion';

/** Оң ылдыйкы бурчтагы Play/Pause баскычы */
export default function MusicButton({ playing, error, onToggle }) {
  if (error) return null; // музыка файлы табылбаса, баскыч көрүнбөйт

  return (
    <motion.button
      type="button"
      className={`music-btn ${playing ? 'is-playing' : ''}`}
      onClick={onToggle}
      aria-label={playing ? 'Музыканы токтотуу' : 'Музыканы ойнотуу'}
      aria-pressed={playing}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 220, damping: 16 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="music-btn__ring" />
      {playing ? (
        <span className="music-btn__bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
        </svg>
      )}
    </motion.button>
  );
}
