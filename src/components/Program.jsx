import { motion } from 'framer-motion';
import config from '../config';
import Section, { fadeUp } from './Section';

const ICONS = {
  welcome: (
    <>
      <path d="M8 4h8l-1 7a3 3 0 0 1-6 0z" />
      <path d="M12 14v6M9 20h6" />
    </>
  ),
  rings: (
    <>
      <circle cx="9" cy="14" r="5" />
      <circle cx="15" cy="14" r="5" />
      <path d="M7.5 6.5 9 4h6l1.5 2.5L12 9z" />
    </>
  ),
  dinner: (
    <>
      <path d="M3 17h18M5 17a7 7 0 0 1 14 0M12 10V8M10.5 8h3M4 20h16" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </>
  ),
  cake: (
    <>
      <path d="M4 20h16v-6H4zM6 14v-3h12v3M12 11V7" />
      <path d="M12 3.5c.9 1 .9 2.2 0 3-.9-.8-.9-2 0-3z" />
    </>
  ),
  sparkle: <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />,
};

export default function Program() {
  const { heading, items } = config.program;
  return (
    <Section id="program" eyebrow="Программа" title={heading} className="program">
      <ol className="timeline">
        {items.map((item, i) => (
          <motion.li key={i} className="timeline__item" variants={fadeUp}>
            <div className="timeline__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                {ICONS[item.icon] || ICONS.sparkle}
              </svg>
            </div>
            <div className="timeline__body">
              <span className="timeline__time">{item.time}</span>
              <h3 className="timeline__title">{item.title}</h3>
              {item.text && <p className="timeline__text">{item.text}</p>}
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
