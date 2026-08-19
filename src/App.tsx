import { useCallback, useState } from 'react';
import { useMousePosition } from './hooks/useMousePosition';
import { useScrollProgress } from './hooks/useScrollProgress';

import Loader from './components/Loader';
import NoiseOverlay from './components/NoiseOverlay';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Philosophy from './components/Philosophy';
import Tracks from './components/Tracks';
import Experience from './components/Experience';
import BringYourOwnChallenge from './components/BringYourOwnChallenge';
import Timeline from './components/Timeline';
import Judging from './components/Judging';
import PrizePool from './components/PrizePool';
import Registration from './components/Registration';
import Footer from './components/Footer';

export default function App() {
  const [entered, setEntered] = useState(false);
  const pointer = useMousePosition();
  const scroll = useScrollProgress();
  const onDone = useCallback(() => setEntered(true), []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {!entered && <Loader onDone={onDone} />}

      <NoiseOverlay />
      <CustomCursor />
      <Navbar />

      <main className={`stage${entered ? ' stage--in' : ''}`} id="main">
        <Hero pointer={pointer} scroll={scroll} />
        <About pointer={pointer} scroll={scroll} />
        <Philosophy pointer={pointer} scroll={scroll} />
        <Tracks pointer={pointer} scroll={scroll} />
        <Experience />
        <BringYourOwnChallenge />
        <Timeline />
        <Judging />
        <PrizePool pointer={pointer} scroll={scroll} />
        <Registration pointer={pointer} scroll={scroll} />
      </main>

       <Footer pointer={pointer} scroll={scroll} /> 
    </>
  );
}
