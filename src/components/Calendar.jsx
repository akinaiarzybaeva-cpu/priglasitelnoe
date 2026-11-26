import { motion } from 'framer-motion';
import config from '../config';
import Section, { fadeUp } from './Section';
import { MONTHS, WEEKDAYS_SHORT, WEEKDAYS_FULL, getEventParts } from '../utils';

export default function Calendar() {
  const { year, month, day, weekday, time } = getEventParts();

  // Айдын биринчи күнү (0 = Дүйшөмбү) жана күндөрдүн саны
  const firstWeekday = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const cells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <Section id="calendar" eyebrow="Күнү" title={config.calendar.heading} className="calendar">
      <motion.div className="card calendar__card" variants={fadeUp}>
        <div className="calendar__month">
          <span className="calendar__month-name">{MONTHS[month - 1]}</span>
          <span className="calendar__year">{year}</span>
        </div>

        <div className="calendar__grid calendar__grid--head">
          {WEEKDAYS_SHORT.map((d, i) => (
            <span key={d} className={i >= 5 ? 'is-weekend' : ''}>
              {d}
            </span>
          ))}
        </div>

        <div className="calendar__grid">
          {cells.map((d, i) =>
            d === day ? (
              <span key={i} className="calendar__day is-event">
                <svg className="calendar__heart" viewBox="0 0 48 44" aria-hidden="true">
                  <path d="M24 42S2 28.6 2 13.8A11.8 11.8 0 0 1 24 7.6a11.8 11.8 0 0 1 22 6.2C46 28.6 24 42 24 42z" />
                </svg>
                <b>{d}</b>
              </span>
            ) : (
              <span key={i} className={`calendar__day ${d ? '' : 'is-empty'}`}>
                {d || ''}
              </span>
            ),
          )}
        </div>
      </motion.div>

      <motion.p className="calendar__caption" variants={fadeUp}>
        {WEEKDAYS_FULL[weekday]}, {day}-{MONTHS[month - 1].toLowerCase()}, саат {time}
      </motion.p>
    </Section>
  );
}
