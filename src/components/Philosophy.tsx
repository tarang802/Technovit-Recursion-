import { useState } from 'react';
import { event } from '../config/event';
import type { TunnelGeometry } from '../data/tracks';
import type { Pointer } from '../hooks/useMousePosition';
import { useInView } from '../hooks/useInView';
import RecursiveTunnel from './RecursiveTunnel';

interface PhilosophyProps {
  pointer: React.MutableRefObject<Pointer>;
  scroll: React.MutableRefObject<number>;
}

interface Mode {
  word: string;
  note: string;
  scale: number;
  distortion: number;
  speed: number;
  boost: number;
  geometry: TunnelGeometry;
  rotation: number;
}

/** Each word rewrites the parameters of the same recursion engine. */
const MODES: Mode[] = [
  { word: 'BUILD.', note: 'TUNNEL EXPANDS', scale: 1.05, distortion: 4, speed: 0.06, boost: 0.4, geometry: 'square', rotation: 0 },
  { word: 'BREAK.', note: 'TUNNEL DISTORTS', scale: 0.9, distortion: 46, speed: 0.05, boost: 0.5, geometry: 'square', rotation: 0.02 },
  { word: 'TEST.', note: 'GRID APPEARS', scale: 0.85, distortion: 6, speed: 0.04, boost: 0.2, geometry: 'grid', rotation: 0 },
  { word: 'SHIP.', note: 'MOVEMENT ACCELERATES', scale: 0.95, distortion: 8, speed: 0.24, boost: 1.4, geometry: 'window', rotation: 0.002 },
  { word: 'REPEAT.', note: 'SYSTEM RESETS', scale: 0.7, distortion: 0, speed: 0.09, boost: 0, geometry: 'square', rotation: 0 },
];

const REST: Omit<Mode, 'word' | 'note'> = {
  scale: 0.8,
  distortion: 10,
  speed: 0.055,
  boost: 0,
  geometry: 'square',
  rotation: 0.001,
};

export default function Philosophy({ pointer, scroll }: PhilosophyProps) {
  const [active, setActive] = useState<number | null>(null);
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const mode = active === null ? REST : MODES[active];

  return (
    <section className="section section--philosophy">
      <div className="tunnel-layer philosophy__tunnel" aria-hidden="true">
        <RecursiveTunnel
          className="tunnel-canvas"
          depth={17}
          intensity={0.85}
          mouseInfluence={22}
          scrollInfluence={0.5}
          pointer={pointer}
          scroll={scroll}
          scale={mode.scale}
          distortion={mode.distortion}
          speed={mode.speed}
          boost={mode.boost}
          geometry={mode.geometry}
          rotation={mode.rotation}
        />
      </div>

      <div className="shell" ref={ref}>
        <div className="eyebrow">
          <span className="eyebrow__index">02</span>
          <span className="meta">THE LOOP BODY</span>
          <span className="eyebrow__rule" />
        </div>

        <h2 className="sr-only">The Recursion philosophy: build, break, test, ship, repeat.</h2>

        <ul className="philosophy__list" onMouseLeave={() => setActive(null)}>
          {MODES.map((m, i) => (
            <li key={m.word}>
              <button
                type="button"
                className={`philosophy__word reveal${inView ? ' is-in' : ''}${active === i ? ' is-active' : ''}`}
                data-delay={Math.min(4, i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                aria-describedby={`phil-note-${i}`}
              >
                <span className="philosophy__index">{String(i + 1).padStart(2, '0')}</span>
                <span className="philosophy__text display-xl">{m.word}</span>
                <span className="philosophy__note meta meta--red" id={`phil-note-${i}`}>
                  {m.note}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className={`philosophy__close lede reveal${inView ? ' is-in' : ''}`} data-delay="4">
          {event.clockLine}
        </p>
      </div>
    </section>
  );
}
