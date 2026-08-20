import { useEffect, useState } from 'react';
import { event } from '../config/event';
import type { Pointer } from '../hooks/useMousePosition';
import RecursiveTunnel from './RecursiveTunnel';
import RegisterLink from './RegisterLink';

interface HeroProps {
  pointer: React.MutableRefObject<Pointer>;
  scroll: React.MutableRefObject<number>;
}

export default function Hero({ pointer, scroll }: HeroProps) {
  const [depthTick, setDepthTick] = useState(1);

  useEffect(() => {
    const id = window.setInterval(() => {
      setDepthTick((d) => ((d + Math.floor(Math.random() * 3)) % 9999) + 1);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="top" tabIndex={-1}>
      <div className="tunnel-layer hero__tunnel" aria-hidden="true">
        <RecursiveTunnel
          className="tunnel-canvas"
          depth={20}
          speed={0.075}
          intensity={1}
          distortion={14}
          rotation={0.004}
          scale={0.92}
          mouseInfluence={38}
          scrollInfluence={1.6}
          originX={0.58}
          originY={0.56}
          pointer={pointer}
          scroll={scroll}
        />
      </div>

      <div className="hero__inner shell">
        <div className="hero__meta sysline">
          <span>
            <i className="dot" />
            SYSTEM: ACTIVE
          </span>
          <span>DEPTH: {String(depthTick).padStart(4, '0')}</span>
          <span>NODE: VITC</span>
          <span>SIGNAL: ONLINE</span>
        </div>

        <h1 className="hero__title">
          <span className="hero__name display-xxl">{event.name}</span>
          <span className="hero__edition">
            <span className="meta">EDITION</span>
            <span className="hero__numeral">{event.editionNumeral}</span>
          </span>
        </h1>

        {/* Two columns from here down. The left keeps the voice, the right takes
            the hard facts and the call to action so the fold is not all mass on
            one side — and so REGISTER never falls below the viewport. */}
        <div className="hero__body">
          <div className="hero__lead">
            <p className="hero__tagline">{event.tagline}</p>

            <p className="hero__philosophy" aria-label="Build. Break. Test. Ship. Repeat.">
              {event.philosophy.map((word) => (
                <span key={word} aria-hidden="true">
                  {word}
                </span>
              ))}
            </p>

            <p className="hero__support lede">{event.heroSupport}</p>
          </div>

          <aside className="hero__rail">
            <div className="hero__actions">
              <RegisterLink className="btn btn--solid">
                <span>ENTER RECURSION</span>
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </RegisterLink>
              <a className="btn" href="#tracks">
                <span>EXPLORE THE LOOPS</span>
                <span className="btn__arrow" aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>

            <dl className="hero__facts">
              <div>
                <dt className="meta meta--faint">FORMAT</dt>
                <dd>24-HOUR OFFLINE HACKATHON</dd>
              </div>
              <div>
                <dt className="meta meta--faint">DATES</dt>
                <dd>3–4 SEPTEMBER 2026</dd>
              </div>
              <div>
                <dt className="meta meta--faint">VENUE</dt>
                <dd>VIT CHENNAI</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>

      <a className="hero__scroll" href="#about">
        <span className="meta">SCROLL TO DESCEND</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
