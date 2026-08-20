import { event } from '../config/event';
import type { Pointer } from '../hooks/useMousePosition';
import { useReducedMotion } from '../hooks/useReducedMotion';
import MicLogo from './MicLogo';
import RecursiveTunnel from './RecursiveTunnel';

interface FooterProps {
  pointer: React.MutableRefObject<Pointer>;
  scroll: React.MutableRefObject<number>;
}

export default function Footer({ pointer, scroll }: FooterProps) {
  const reduced = useReducedMotion();

  const enterAgain = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    window.setTimeout(
      () => document.getElementById('top')?.focus({ preventScroll: true }),
      reduced ? 0 : 700,
    );
  };

  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <div className="footer__mark">
          <MicLogo className="footer__logo" />
          <span className="footer__name display-lg">{event.name}</span>
          <span className="footer__numeral">{event.editionNumeral}</span>
        </div>

        {/* Four equal columns, each opening on the same rule, so every heading
            sits on one baseline instead of the ragged 1-tall/3-tall mix. */}
        <div className="footer__cols">
          <div className="footer__col">
            <span className="meta meta--red">ORGANISED BY</span>
            <div className="footer__org">
              <MicLogo className="footer__org-logo" />
              <p className="footer__value">
                Microsoft Innovations Club
                <br />
                VIT Chennai
              </p>
            </div>
          </div>

          <div className="footer__col">
            <span className="meta meta--red">FLAGSHIP EVENT OF</span>
            <p className="footer__value">TechnoVIT 2026</p>
          </div>

          <div className="footer__col">
            <span className="meta meta--red">WHEN &amp; WHERE</span>
            <p className="footer__value">
              {event.date}
              <br />
              {event.venue}
              <br />
              24-hour offline hackathon
            </p>
          </div>

          <div className="footer__col">
            <span className="meta meta--red">FOLLOW</span>
            <ul className="footer__links">
              <li>
                <a href={event.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={event.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href={`mailto:${event.email}`}>{event.email}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="footer__closing display-md">{event.closingLine}</p>

      {/* THE FINAL LOOP — the visual language of the hero, returning. */}
      <section className="loop" aria-labelledby="loop-heading">
        <div className="tunnel-layer loop__tunnel" aria-hidden="true">
          <RecursiveTunnel
            className="tunnel-canvas"
            depth={24}
            speed={0.085}
            intensity={0.6}
            distortion={12}
            rotation={0.0025}
            scale={1.3}
            mouseInfluence={40}
            scrollInfluence={0.6}
            pointer={pointer}
            scroll={scroll}
          />
        </div>

        <div className="loop__inner">
          <h2 className="loop__title" id="loop-heading">
            <span className="display-xl">{event.name}</span>
            <span className="meta">{event.edition}</span>
          </h2>
          <p className="loop__tagline meta meta--red">{event.tagline}</p>
          <p className="loop__ready display-md">READY?</p>
          <button type="button" className="btn btn--solid loop__cta" onClick={enterAgain}>
            <span>ENTER AGAIN</span>
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </section>

      <div className="footer__base shell">
        <span className="meta meta--faint">
          © 2026 Microsoft Innovations Club, VIT Chennai
        </span>
        <span className="meta meta--faint">REC/II · NODE: VITC · LOOP: 02</span>
      </div>
    </footer>
  );
}
