import { overallFlow, schedule } from '../data/schedule';
import type { ScheduleEntry } from '../data/schedule';
import { useInView } from '../hooks/useInView';

function Entry({ entry, depth }: { entry: ScheduleEntry; depth: number }) {
  const { ref, inView } = useInView<HTMLLIElement>(0.35);

  return (
    <li
      className={`clock__entry${entry.marker ? ' clock__entry--marker' : ''}${inView ? ' is-in' : ''}`}
      ref={ref}
    >
      <span className="clock__node" aria-hidden="true">
        <i />
      </span>
      <div className="clock__time">
        <span className="clock__time-value">{entry.time}</span>
        <span className="clock__depth meta meta--faint" aria-hidden="true">
          DEPTH {String(depth).padStart(4, '0')}
        </span>
      </div>
      <div className="clock__body">
        <h4 className="clock__title">{entry.title}</h4>
        <p className="clock__detail">{entry.detail}</p>
      </div>
    </li>
  );
}

export default function Timeline() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  let depth = 0;

  return (
    <section className="section section--clock" id="schedule">
      <div className="shell" ref={ref}>
        <div className="eyebrow">
          <span className="eyebrow__index">06</span>
          <span className="meta">EVENT FLOW</span>
          <span className="eyebrow__rule" />
        </div>

        <div className="clock__head">
          <h2 className={`display-lg reveal${inView ? ' is-in' : ''}`}>THE CLOCK</h2>
          <p className={`lede clock__sub reveal${inView ? ' is-in' : ''}`} data-delay="1">
            Twenty-four hours.
            <br />
            Three rounds of judging.
          </p>
        </div>

        <div className="clock__track">
          {schedule.map((day) => (
            <section className="clock__day" key={day.day} aria-label={day.day}>
              <header className="clock__day-head">
                <h3 className="clock__day-title">{day.day}</h3>
                <span className="meta meta--red">{day.dayLabel}</span>
              </header>
              <ol className="clock__entries">
                {day.entries.map((entry) => {
                  depth += 1;
                  return <Entry key={entry.title + entry.time} entry={entry} depth={depth} />;
                })}
              </ol>
            </section>
          ))}
        </div>

        <div className="clock__flow">
          <span className="meta meta--red">OVERALL FLOW</span>
          <p className="clock__flow-list">
            {overallFlow.map((step, i) => (
              <span key={`${step}-${i}`}>
                {step}
                {i < overallFlow.length - 1 ? <i aria-hidden="true">→</i> : null}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
