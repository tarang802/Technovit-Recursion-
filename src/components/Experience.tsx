import { useInView } from '../hooks/useInView';

export default function Experience() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section className="section section--experience" id="experience">
      <div className="shell" ref={ref}>
        <div className="eyebrow">
          <span className="eyebrow__index">04</span>
          <span className="meta">THE EXPERIENCE</span>
          <span className="eyebrow__rule" />
        </div>

        <div className="split split--wide-left">
          <h2 className={`display-lg experience__title reveal${inView ? ' is-in' : ''}`}>
            24 HOURS.
            <br />
            ONE ROOM.
            <br />
            <span className="red">NO RESET.</span>
          </h2>

          <div className={`prose reveal${inView ? ' is-in' : ''}`} data-delay="2">
            <p>
              Recursion is a full-day, full-night hackathon bringing together the shortlisted teams
              for 24 hours of uninterrupted building.
            </p>
            <p>
              Whether a team walks in with a locked-in idea or figures it out on the floor, the brief
              is the same: <strong>build under pressure</strong>, compete against the best builders
              on campus, and make the 24 hours count.
            </p>
          </div>
        </div>

        <ul className={`experience__brief reveal${inView ? ' is-in' : ''}`} data-delay="3">
          <li>BUILD UNDER PRESSURE.</li>
          <li>COMPETE.</li>
          <li>SHIP.</li>
        </ul>
      </div>
    </section>
  );
}
