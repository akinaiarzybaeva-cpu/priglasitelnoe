import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import config from './config';
import useMusic from './hooks/useMusic';
import Envelope from './components/Envelope';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
import Calendar from './components/Calendar';
import Countdown from './components/Countdown';
import Program from './components/Program';
import Location from './components/Location';
import RSVP from './components/RSVP';
import Finale from './components/Finale';
import MusicButton from './components/MusicButton';
import Petals from './components/Petals';

export default function App() {
  const [opened, setOpened] = useState(false);
  const music = useMusic(config.music);

  const handleOpenStart = () => {
    if (config.music.playOnOpen) music.play();
  };

  const handleOpened = () => {
    window.scrollTo(0, 0);
    setOpened(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!opened ? (
          <Envelope key="envelope" onOpenStart={handleOpenStart} onOpened={handleOpened} />
        ) : (
          <motion.main
            key="invitation"
            className="page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Petals count={10} />
            <Hero />
            <Invitation />
            <Calendar />
            <Countdown />
            <Program />
            <Location />
            <RSVP />
            <Finale />
          </motion.main>
        )}
      </AnimatePresence>

      {opened && <MusicButton playing={music.playing} error={music.error} onToggle={music.toggle} />}
    </>
  );
}
