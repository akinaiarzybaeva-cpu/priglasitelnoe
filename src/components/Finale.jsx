import { motion } from 'framer-motion';
import config from '../config';
import { getEventParts, pad } from '../utils';
import { Flower, LavenderSprig, Divider, FloralCorner } from './Ornaments';
import { fadeUp, stagger } from './Section';

// Гүлдөрдүн жайгашуусу: [x %, y px, өлчөм, кечигүү]
const BOUQUET = [
  [50, 0, 96, 0.2],
  [28, 26, 66, 0.45],
  [72, 26, 66, 0.55],
  [12, 64, 44, 0.75],
  [88, 64, 44, 0.85],
  [40, 74, 38, 0.95],
  [60, 74, 38, 1.05],
];

const bloom = {
  hidden: { scale: 0, rotate: -90, opacity: 0 },
  show: (delay) => ({
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { delay, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

export default function Finale() {
  const { finale, couple } = config;
  const { day, month, year } = getEventParts();

  return (
    <motion.footer
      className="finale"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger(0.18, 0.2)}
    >
      <FloralCorner position="bl" />
      <FloralCorner position="br" />

      <div className="bouquet" aria-hidden="true">
        <motion.div className="bouquet__sprigs" variants={fadeUp}>
          <LavenderSprig height={120} style={{ transform: 'rotate(-28deg)' }} />
          <LavenderSprig height={140} />
          <LavenderSprig height={120} style={{ transform: 'rotate(28deg)' }} />
        </motion.div>
        {BOUQUET.map(([x, y, size, delay], i) => (
          <motion.div
            key={i}
            className="bouquet__flower"
            style={{ left: `${x}%`, top: y, width: size, height: size, marginLeft: -size / 2 }}
            variants={bloom}
            custom={delay}
          >
            <Flower size={size} />
          </motion.div>
        ))}
      </div>

      <motion.h2 className="script-title" variants={fadeUp}>
        {finale.heading}
      </motion.h2>
      <motion.p className="finale__text" variants={fadeUp}>
        {finale.text}
      </motion.p>
      <motion.div variants={fadeUp}>
        <Divider />
      </motion.div>
      <motion.p className="finale__closing" variants={fadeUp}>
        {finale.closing}
      </motion.p>
      <motion.p className="finale__names" variants={fadeUp}>
        {couple.bride} <span className="amp">&amp;</span> {couple.groom}
      </motion.p>
      <motion.p className="finale__date" variants={fadeUp}>
        {pad(day)} · {pad(month)} · {year}
      </motion.p>
    </motion.footer>
  );
}
