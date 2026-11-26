import { motion } from 'framer-motion';
import { Divider } from './Ornaments';

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger = (step = 0.15, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

/** Ар бир бөлүктүн жалпы кабы: экранга киргенде акырын пайда болот. */
export default function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <motion.section
      id={id}
      className={`section ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger(0.14)}
    >
      {(eyebrow || title) && (
        <header className="section__head">
          {eyebrow && (
            <motion.p className="eyebrow" variants={fadeUp}>
              {eyebrow}
            </motion.p>
          )}
          {title && (
            <motion.h2 className="script-title" variants={fadeUp}>
              {title}
            </motion.h2>
          )}
          <motion.div variants={fadeUp}>
            <Divider />
          </motion.div>
        </header>
      )}
      {children}
    </motion.section>
  );
}
