import { judgingCriteria, judgingRounds } from '../data/content';
import { useInView } from '../hooks/useInView';

export default function Judging() {
  const { ref, inView } = useInView<HTMLDivElement>(0.18);

  return (
    <section className="section section--judging" id="judging">
      <div className="shell" ref={ref}>
        <div className="eyebrow">
          <span className="eyebrow__index">07</span>
          <span className="meta">EVALUATION</span>
          <span className="eyebrow__rule" />
        </div>

        <h2 className={`display-lg judging__title reveal${inView ? ' is-in' : ''}`}>
          THREE ROUNDS.
          <br />
          <span className="red">ONE WINNER.</span>
        </h2>

        <ol className="judging__rounds">
          {judgingRounds.map((round, i) => (
            <li
              key={round.number}
              className={`judging__round reveal${inView ? ' is-in' : ''}`}
              data-delay={i + 1}
            >
              <span className="judging__num" aria-hidden="true">
                {round.number}
              </span>
              <h3 className="judging__round-title">{round.title}</h3>
              <span className="judging__round-time meta meta--red">{round.body}</span>
            </li>
          ))}
        </ol>

        <div className="judging__panel">
          <div className="judging__panel-head">
            <span className="meta meta--red">FINAL JUDGING</span>
            <span className="meta meta--faint">10:30–11:30 AM / 4 SEPT</span>
          </div>
          <p className="judging__panel-lede">Projects are evaluated on:</p>
          <ul className="judging__criteria">
            {judgingCriteria.map((c, i) => (
              <li key={c}>
                <span className="meta meta--faint">{String(i + 1).padStart(2, '0')}</span>
                <span className="judging__criterion">{c}</span>
              </li>
            ))}
          </ul>
          <p className="sysline judging__status">
            <span>
              <i className="dot" />
              PANEL: ACTIVE
            </span>
            <span>ROUNDS: 03</span>
            <span>TOP 10 REACH THE FINAL PITCH</span>
          </p>
        </div>
      </div>
    </section>
  );
}
