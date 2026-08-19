import { judgeBenefits, judgingInvolves } from '../data/content';
import { judgeMailto } from '../config/event';
import { useInView } from '../hooks/useInView';

export default function Judges() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section className="section section--judges">
      <div className="shell" ref={ref}>
        <div className="eyebrow">
          <span className="eyebrow__index">08</span>
          <span className="meta">CALL FOR JUDGES</span>
          <span className="eyebrow__rule" />
        </div>

        <h2 className={`display-md judges__title reveal${inView ? ' is-in' : ''}`}>
          CAN YOU SPOT A REAL IDEA AT <span className="red">4AM?</span>
        </h2>

        <div className="split judges__body">
          <div className={`reveal${inView ? ' is-in' : ''}`} data-delay="1">
            <h3 className="judges__sub meta meta--red">WHAT JUDGING INVOLVES</h3>
            <ul className="judges__list">
              {judgingInvolves.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={`reveal${inView ? ' is-in' : ''}`} data-delay="2">
            <h3 className="judges__sub meta meta--red">WHAT JUDGES GET</h3>
            <dl className="judges__benefits">
              {judgeBenefits.map((b) => (
                <div key={b.number}>
                  <dt>
                    <span className="judges__benefit-num" aria-hidden="true">
                      {b.number}
                    </span>
                    {b.title}
                  </dt>
                  <dd>{b.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <a className="btn judges__cta" href={judgeMailto}>
          <span>BECOME A JUDGE</span>
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
