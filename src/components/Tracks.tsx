import { useState } from 'react';
import { tracks } from '../data/tracks';
import type { Pointer } from '../hooks/useMousePosition';
import { useInView } from '../hooks/useInView';
import RecursiveTunnel from './RecursiveTunnel';

interface TracksProps {
  pointer: React.MutableRefObject<Pointer>;
  scroll: React.MutableRefObject<number>;
}

export default function Tracks({ pointer, scroll }: TracksProps) {
  const [open, setOpen] = useState<string>(tracks[0].id);
  const [hover, setHover] = useState<string | null>(null);
  const { ref, inView } = useInView<HTMLDivElement>(0.12);

  const focused = tracks.find((t) => t.id === (hover ?? open)) ?? tracks[0];

  return (
    <section className="section section--tracks" id="tracks">
      <div className="tunnel-layer tracks__tunnel" aria-hidden="true">
        <RecursiveTunnel
          className="tunnel-canvas"
          depth={18}
          speed={0.06}
          intensity={0.5}
          distortion={hover ? 20 : 8}
          rotation={0.003}
          scale={hover ? 0.95 : 0.78}
          mouseInfluence={26}
          scrollInfluence={0.5}
          geometry={focused.geometry}
          boost={hover ? 0.65 : 0}
          originX={0.5}
          originY={0.5}
          pointer={pointer}
          scroll={scroll}
        />
      </div>

      <div className="shell" ref={ref}>
        <div className="eyebrow">
          <span className="eyebrow__index">03</span>
          <span className="meta">COMPETITION TRACKS</span>
          <span className="eyebrow__rule" />
        </div>

        <div className="tracks__head">
          <h2 className={`display-lg reveal${inView ? ' is-in' : ''}`}>THE FIVE LOOPS</h2>
          <p className={`tracks__sub lede reveal${inView ? ' is-in' : ''}`} data-delay="1">
            Five domains.
            <br />
            One clock.
          </p>
        </div>

        <ul className="tracks__list" onMouseLeave={() => setHover(null)}>
          {tracks.map((track) => {
            const isOpen = open === track.id;
            return (
              <li
                key={track.id}
                className={`track${isOpen ? ' track--open' : ''}${hover === track.id ? ' track--hover' : ''}`}
                onMouseEnter={() => setHover(track.id)}
              >
                <h3 className="track__heading">
                  <button
                    type="button"
                    className="track__button"
                    aria-expanded={isOpen}
                    aria-controls={`panel-${track.id}`}
                    onClick={() => setOpen(isOpen ? '' : track.id)}
                    onFocus={() => setHover(track.id)}
                    onBlur={() => setHover(null)}
                  >
                    <span className="track__number" aria-hidden="true">
                      {track.number}
                    </span>
                    <span className="track__title">
                      <span className="sr-only">Track {track.number}: </span>
                      {track.title}
                    </span>
                    <span className="track__sign" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                </h3>

                <div
                  className="track__panel"
                  id={`panel-${track.id}`}
                  role="region"
                  aria-label={track.title}
                  hidden={!isOpen}
                >
                  <div className="track__panel-inner">
                    <p className="track__desc">{track.description}</p>
                    <dl className="track__spec">
                      <div>
                        <dt className="meta meta--faint">CORE</dt>
                        <dd className="meta">{track.core}</dd>
                      </div>
                      <div>
                        <dt className="meta meta--faint">GEOMETRY</dt>
                        <dd className="meta meta--red">{track.geometryLabel}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="tracks__foot sysline">
          <span>
            <i className="dot" />
            LOOPS: 05
          </span>
          <span>ACTIVE: TRACK {focused.number}</span>
          <span>ENTRY POINTS INTO ONE SYSTEM</span>
        </p>
      </div>
    </section>
  );
}
