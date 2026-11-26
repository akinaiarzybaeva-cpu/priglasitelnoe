import { motion } from 'framer-motion';
import config from '../config';
import Section, { fadeUp } from './Section';

export default function Location() {
  const { heading, venue, address, mapsUrl, showMap, note } = config.location;
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(`${venue}, ${address}`)}&z=15&output=embed`;

  return (
    <Section id="location" eyebrow="Location" title={heading} className="location">
      <motion.div className="card location__card" variants={fadeUp}>
        <svg className="location__pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
          <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
        <h3 className="location__venue">{venue}</h3>
        <p className="location__address">{address}</p>
        {note && <p className="location__note">{note}</p>}

        {showMap && (
          <div className="location__map">
            <iframe
              title={venue}
              src={embedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        )}

        <a className="btn btn--gold" href={mapsUrl} target="_blank" rel="noopener noreferrer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z" />
            <path d="M9 4v14M15 6v14" />
          </svg>
          Google Maps аркылуу ачуу
        </a>
      </motion.div>
    </Section>
  );
}
