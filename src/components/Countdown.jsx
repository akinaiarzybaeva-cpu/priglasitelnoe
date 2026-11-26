import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import config from '../config';
import Section, { fadeUp } from './Section';
import { getEventTimestamp, pad } from '../utils';

function getRemaining(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    done: diff === 0,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Unit({ value, label }) {
  const text = label === 'Күн' ? String(value) : pad(value);
  return (
    <div className="countdown__unit">
      <div className="countdown__value">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: '-60%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '60%', opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="countdown__label">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const target = getEventTimestamp();
  const [left, setLeft] = useState(() => getRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setLeft(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <Section id="countdown" eyebrow="Countdown" title={config.countdown.heading} className="countdown">
      {left.done ? (
        <motion.p className="countdown__done" variants={fadeUp}>
          {config.countdown.finishedText}
        </motion.p>
      ) : (
        <motion.div className="countdown__grid" variants={fadeUp}>
          <Unit value={left.days} label="Күн" />
          <Unit value={left.hours} label="Саат" />
          <Unit value={left.minutes} label="Мүнөт" />
          <Unit value={left.seconds} label="Секунд" />
        </motion.div>
      )}
    </Section>
  );
}
