import type { Pointer } from '../hooks/useMousePosition';
import { useInView } from '../hooks/useInView';
import MicLogo from './MicLogo';
import RecursiveTunnel from './RecursiveTunnel';
import Stats from './Stats';

interface AboutProps {
  pointer: React.MutableRefObject<Pointer>;
  scroll: React.MutableRefObject<number>;
}

export default function About({ pointer, scroll }: AboutProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section className="section section--about" id="about">
      <div className="tunnel-layer about__tunnel" aria-hidden="true">
        <RecursiveTunnel
          className="tunnel-canvas"
          depth={13}
          speed={0.04}
          intensity={0.55}
          distortion={6}
          scale={0.42}
          mouseInfluence={16}
          scrollInfluence={0.6}
          originX={0.88}
          originY={0.24}
          pointer={pointer}
          scroll={scroll}
        />
      </div>

      <div className="shell" ref={ref}>
        <div className="eyebrow">
          <span className="eyebrow__index">01</span>
          <span className="meta">ABOUT THE EVENT</span>
          <span className="eyebrow__rule" />
        </div>

        <h2 className={`display-lg about__heading reveal${inView ? ' is-in' : ''}`}>
          WHAT IS RECURSION?
        </h2>

        <div className="split about__body">
          <div className={`about__statement reveal${inView ? ' is-in' : ''}`} data-delay="1">
            <p className="about__quote">A festival&rsquo;s biggest night doesn&rsquo;t sleep.</p>
            <div className="about__hours">
              <span className="about__hours-num">24</span>
              <span className="meta">HOURS</span>
            </div>
          </div>

          <div className={`prose reveal${inView ? ' is-in' : ''}`} data-delay="2">
            <p>
              Recursion &mdash; Edition II is the flagship hackathon of{' '}
              <strong>TechnoVIT 2026</strong>, organised by the{' '}
              <strong>Microsoft Innovations Club</strong> at VIT Chennai. Building on the strength
              of its first edition, Recursion returns on a far larger scale as a 24-hour overnight
              hackathon, calling on India&rsquo;s sharpest student builders to design, code and ship
              in real time.
            </p>
            <p>
              It is also the <strong>only overnight, large-scale event</strong> running across all of
              TechnoVIT 2026 &mdash; the single experience that keeps the festival&rsquo;s energy
              alive after dark, and one of its defining flagship moments.
            </p>
            <p>
              The event brings together a diverse community of developers, designers, innovators and
              aspiring entrepreneurs, creating a dense, high-signal environment for technical
              collaboration, mentorship and networking.
            </p>

            <dl className="about__facts">
              <div>
                <dt className="meta meta--red">ORGANISER</dt>
                <dd className="about__organiser">
                  <MicLogo className="about__organiser-logo" />
                  Microsoft Innovations Club, VIT Chennai
                </dd>
              </div>
              <div>
                <dt className="meta meta--red">PARENT FESTIVAL</dt>
                <dd>TechnoVIT 2026</dd>
              </div>
              <div>
                <dt className="meta meta--red">AUDIENCE</dt>
                <dd>Developers, designers, innovators &amp; builders</dd>
              </div>
            </dl>
          </div>
        </div>

        <Stats />
      </div>
    </section>
  );
}
