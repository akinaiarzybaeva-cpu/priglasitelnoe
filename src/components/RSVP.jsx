import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import config from '../config';
import Section, { fadeUp } from './Section';

const OPTIONS = [
  { value: 'yes', label: 'Катышам', reply: 'Катышам ✅' },
  { value: 'no', label: 'Катыша албайм', reply: 'Тилекке каршы, катыша албайм' },
];

export default function RSVP() {
  const { rsvp, couple } = config;
  const [name, setName] = useState('');
  const [attend, setAttend] = useState('yes');
  const [guests, setGuests] = useState(1);
  const [wish, setWish] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Сураныч, аты-жөнүңүздү жазыңыз');
      return;
    }
    setError('');

    const answer = OPTIONS.find((o) => o.value === attend).reply;
    const lines = [
      `Саламатсыздарбы, ${couple.bride} жана ${couple.groom}!`,
      '',
      `Аты-жөнүм: ${name.trim()}`,
      `Жообум: ${answer}`,
      attend === 'yes' ? `Коноктордун саны: ${guests}` : null,
      wish.trim() ? `Каалоом: ${wish.trim()}` : null,
    ].filter((l) => l !== null);

    const url = `https://wa.me/${rsvp.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
    setSent(true);
  };

  return (
    <Section id="rsvp" eyebrow="RSVP" title={rsvp.heading} className="rsvp">
      <motion.p className="section__lead" variants={fadeUp}>
        {rsvp.text}
      </motion.p>

      <motion.form className="card rsvp__form" variants={fadeUp} onSubmit={submit} noValidate>
        <label className="field">
          <span className="field__label">Аты-жөнүңүз</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Мисалы: Айгерим Асанова"
            autoComplete="name"
            aria-invalid={!!error}
          />
        </label>
        <AnimatePresence>
          {error && (
            <motion.p className="field__error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="choice" role="radiogroup" aria-label="Катышасызбы?">
          {OPTIONS.map((o) => (
            <label key={o.value} className={`choice__item ${attend === o.value ? 'is-active' : ''}`}>
              <input type="radio" name="attend" value={o.value} checked={attend === o.value} onChange={() => setAttend(o.value)} />
              <span className="choice__dot" />
              {o.label}
            </label>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {attend === 'yes' && (
            <motion.div className="field" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
              <span className="field__label">Канча киши келесиздер?</span>
              <div className="stepper">
                <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} aria-label="Азайтуу">
                  −
                </button>
                <span>{guests}</span>
                <button type="button" onClick={() => setGuests((g) => Math.min(rsvp.maxGuests, g + 1))} aria-label="Көбөйтүү">
                  +
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <label className="field">
          <span className="field__label">Жаштарга каалоо (милдеттүү эмес)</span>
          <textarea rows={3} value={wish} onChange={(e) => setWish(e.target.value)} placeholder="Жылуу сөздөрүңүз..." />
        </label>

        <button type="submit" className="btn btn--whatsapp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3z" />
          </svg>
          WhatsApp аркылуу жөнөтүү
        </button>

        <AnimatePresence>
          {sent && (
            <motion.p className="rsvp__thanks" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              Рахмат! WhatsApp ачылбаса, баскычты кайра басыңыз.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>
    </Section>
  );
}
