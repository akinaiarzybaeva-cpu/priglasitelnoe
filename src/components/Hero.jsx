import { useState } from 'react';
import { motion } from 'framer-motion';
import config from '../config';
import { asset, getEventParts, pad } from '../utils';
import { FloralCorner, LavenderSprig, Flower, Divider } from './Ornaments';
import { fadeUp, stagger } from './Section';

export default function Hero() {
  const { couple, event, hero } = config;
  const { day, month, year } = getEventParts();
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <motion.header className="hero" initial="hidden" animate="show" variants={stagger(0.18, 0.2)}>
      <FloralCorner position="tl" />
      <FloralCorner position="tr" />

      <motion.p className="eyebrow" variants={fadeUp}>
        {hero.eyebrow}
      </motion.p>

      <motion.h1 className="hero__names" variants={fadeUp}>
        <span>{couple.bride}</span>
        <span className="hero__amp">&amp;</span>
        <span>{couple.groom}</span>
      </motion.h1>

      <motion.div className="hero__photo-wrap" variants={fadeUp}>
        <LavenderSprig className="hero__sprig hero__sprig--l" height={150} />
        <LavenderSprig className="hero__sprig hero__sprig--r" height={130} />
        <div className="hero__arch">
          {!photoFailed && hero.photo ? (
            <img
              src={asset(hero.photo)}
              alt={hero.photoAlt}
              onError={() => setPhotoFailed(true)}
              loading="eager"
              decoding="async"
            />
          ) : (
            // Сүрөт жок болсо — кооз монограмма
            <div className="hero__placeholder">
              <Flower size={90} />
              <span>{couple.initials}</span>
            </div>
          )}
        </div>
        <Flower className="hero__flower hero__flower--a" size={64} />
        <Flower className="hero__flower hero__flower--b" size={44} />
      </motion.div>

      <motion.h2 className="hero__title" variants={fadeUp}>
        {event.title}
      </motion.h2>

      <motion.div className="hero__date" variants={fadeUp}>
        <span>{pad(day)}</span>
        <i />
        <span>{pad(month)}</span>
        <i />
        <span>{year}</span>
      </motion.div>

      <motion.p className="hero__tagline" variants={fadeUp}>
        {hero.tagline}
      </motion.p>

      <motion.div variants={fadeUp}>
        <Divider />
      </motion.div>

      <motion.a
        href="#invitation"
        className="scroll-hint"
        aria-label="Төмөн жылдыруу"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="1" y="1" width="20" height="32" rx="10" />
          <line x1="11" y1="8" x2="11" y2="14" strokeLinecap="round" />
        </svg>
      </motion.a>
    </motion.header>
  );
}
