import { motion } from 'framer-motion';
import config from '../config';
import Section, { fadeUp } from './Section';
import { LavenderSprig } from './Ornaments';

export default function Invitation() {
  const { invitation, couple } = config;
  return (
    <Section id="invitation" eyebrow="Чакыруу" title={invitation.greeting} className="invitation">
      <div className="card card--paper">
        <LavenderSprig className="card__sprig" height={110} />
        {invitation.paragraphs.map((p, i) => (
          <motion.p key={i} className="invitation__text" variants={fadeUp}>
            {p}
          </motion.p>
        ))}
        <motion.p className="invitation__sign" variants={fadeUp}>
          {invitation.signature},
        </motion.p>
        <motion.p className="invitation__names" variants={fadeUp}>
          {couple.bride} <span className="amp">&amp;</span> {couple.groom}
        </motion.p>
      </div>
    </Section>
  );
}
