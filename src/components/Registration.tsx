import { event, isExternalRegistration } from '../config/event';
import type { Pointer } from '../hooks/useMousePosition';
import { useInView } from '../hooks/useInView';
import RecursiveTunnel from './RecursiveTunnel';
import RegisterLink from './RegisterLink';

interface RegistrationProps {
  pointer: React.MutableRefObject<Pointer>;
  scroll: React.MutableRefObject<number>;
}

export default function Registration({ pointer, scroll }: RegistrationProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section className="section section--registration" id="registration">
      <div className="tunnel-layer registration__tunnel" aria-hidden="true">
        <RecursiveTunnel
          className="tunnel-canvas"
          depth={20}
          speed={0.09}
          intensity={0.58}
          distortion={16}
          rotation={0.003}
          scale={1.05}
          mouseInfluence={30}
          scrollInfluence={0.5}
          pointer={pointer}
          scroll={scroll}
        />
      </div>

      <div className="shell registration__inner" ref={ref}>
        <div className="eyebrow">
          <span className="eyebrow__index">08</span>
          <span className="meta">REGISTRATION</span>
          <span className="eyebrow__rule" />
        </div>

        <h2 className={`display-xl registration__title reveal${inView ? ' is-in' : ''}`}>
          THE CLOCK
          <br />
          IS WAITING.
        </h2>

        <p className={`registration__where reveal${inView ? ' is-in' : ''}`} data-delay="1">
          <span>{event.date.toUpperCase()}</span>
          <span aria-hidden="true">/</span>
          <span>{event.venue.toUpperCase()}</span>
        </p>

        <div className="registration__status">
          <p className="meta meta--red">SELECTED TEAMS ONLY</p>
          <p className="registration__note">
            {isExternalRegistration
              ? 'Registration is open. Follow the link to enter.'
              : 'Registration details will be announced. Follow Microsoft Innovations Club on LinkedIn and Instagram, or write to us, to be notified when the loop opens.'}
          </p>
        </div>

        <div className="registration__actions">
          <RegisterLink className="btn btn--solid registration__cta">
            <span>ENTER RECURSION</span>
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </RegisterLink>
          <a className="btn" href="#tracks">
            <span>EXPLORE THE TRACKS</span>
          </a>
        </div>

        <p className="sysline registration__sys">
          <span>
            <i className="dot" />
            BUILD STATUS: RUNNING
          </span>
          <span>SHORTLIST: {event.shortlisted}</span>
          <span>REGISTRATIONS: {event.registrations}</span>
          <span>TIME REMAINING: —</span>
        </p>
      </div>
    </section>
  );
}
