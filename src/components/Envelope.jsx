import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import config from '../config';
import { getEventParts, pad } from '../utils';
import { FloralCorner, LavenderSprig, Divider } from './Ornaments';
import Petals from './Petals';

/*
  Конверттин ачылуу этаптары:
  closed  → жабык, "Ачуу" баскычын күтөт
  flap    → капкагы артка ачылат, мөөр жоголот
  letter  → ичиндеги баракча өйдө чыгат
  leaving → бүт сахна акырын чоңоюп, жоголот → onOpened()
*/
const TIMINGS = { letter: 950, leaving: 2500, done: 3300 };

export default function Envelope({ onOpenStart, onOpened }) {
  const [stage, setStage] = useState('closed');
  const timers = useRef([]);
  const { couple, envelope } = config;
  const { day, month, year } = getEventParts();

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const open = () => {
    if (stage !== 'closed') return;
    setStage('flap');
    // Музыка колдонуучунун басуусу ичинде башталышы керек (браузер эрежеси)
    onOpenStart?.();
    timers.current = [
      setTimeout(() => setStage('letter'), TIMINGS.letter),
      setTimeout(() => setStage('leaving'), TIMINGS.leaving),
      setTimeout(() => onOpened?.(), TIMINGS.done),
    ];
  };

  const isOpen = stage !== 'closed';
  const letterOut = stage === 'letter' || stage === 'leaving';

  return (
    <motion.div
      className="envelope-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <Petals count={12} />
      <FloralCorner position="tl" />
      <FloralCorner position="br" />

      <motion.div
        className="envelope-stage"
        animate={stage === 'leaving' ? { scale: 1.12, opacity: 0, y: -30 } : { scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <motion.p
          className="envelope-label"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isOpen ? 0 : 1, y: 0 }}
          transition={{ duration: isOpen ? 0.4 : 1, delay: isOpen ? 0 : 0.3 }}
        >
          {envelope.label}
        </motion.p>

        <motion.div
          className="envelope"
          initial={{ opacity: 0, y: 40, scale: 0.94 }}
          animate={{ opacity: 1, y: letterOut ? 60 : 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          onClick={open}
          role="button"
          tabIndex={-1}
          aria-label={envelope.buttonText}
        >
          {/* Арткы бети */}
          <div className="env-back" />

          {/* Ичиндеги баракча */}
          <motion.div
            className="env-letter"
            animate={{ y: letterOut ? '-62%' : '0%' }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="env-letter__inner">
              <span className="eyebrow">{config.event.title}</span>
              <span className="env-letter__names">
                {couple.bride} <em>&amp;</em> {couple.groom}
              </span>
              <Divider />
              <span className="env-letter__date">
                {pad(day)} · {pad(month)} · {year}
              </span>
            </div>
          </motion.div>

          {/* Алдыңкы чөнтөк */}
          <div className="env-pocket">
            <svg className="env-pocket__folds" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 100 L50 56 L100 100" fill="none" stroke="rgba(149,115,56,.35)" strokeWidth="0.35" />
            </svg>
            <LavenderSprig className="env-sprig env-sprig--l" height={92} />
            <LavenderSprig className="env-sprig env-sprig--r" height={80} />
          </div>

          {/* Капкак */}
          <motion.div
            className="env-flap-wrap"
            style={{ zIndex: letterOut ? 1 : 4 }}
            animate={{ rotateX: isOpen ? 180 : 0 }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="env-flap" />
          </motion.div>

          {/* Мом мөөр */}
          <motion.button
            type="button"
            className="env-seal"
            onClick={(e) => {
              e.stopPropagation();
              open();
            }}
            animate={isOpen ? { scale: 0.4, opacity: 0, rotate: -40 } : { scale: [1, 1.06, 1], opacity: 1 }}
            transition={isOpen ? { duration: 0.4 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            aria-label={envelope.buttonText}
          >
            <span>{couple.initials}</span>
          </motion.button>
        </motion.div>

        <motion.div
          className="envelope-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: isOpen ? 0 : 1, y: 0 }}
          transition={{ duration: 0.8, delay: isOpen ? 0 : 0.7 }}
        >
          <button type="button" className="btn btn--gold" onClick={open} disabled={isOpen}>
            {envelope.buttonText}
          </button>
          <p className="envelope-hint">{envelope.hint}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
