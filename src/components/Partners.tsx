import { customPartnershipAxes, partnerBenefits } from '../data/content';
import { event, partnerMailto } from '../config/event';
import { useInView } from '../hooks/useInView';

export default function Partners() {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);

  return (
    <section className="section section--partner" id="partner">
      <div className="shell" ref={ref}>
        <div className="eyebrow">
          <span className="eyebrow__index">09</span>
          <span className="meta">PARTNER WITH US</span>
          <span className="eyebrow__rule" />
        </div>

        <h2 className={`display-lg partner__title reveal${inView ? ' is-in' : ''}`}>
          REACH A ROOM FULL OF
          <br />
          THE BUILDERS
          <br />
          <span className="red">YOU&rsquo;LL BE HIRING NEXT.</span>
        </h2>

        <p className={`lede partner__lede reveal${inView ? ' is-in' : ''}`} data-delay="1">
          Recursion puts your brand in front of a large, highly-engaged technical audience &mdash;
          not for a scroll, but for a full 24 hours.
        </p>

        <ol className="partner__grid">
          {partnerBenefits.map((item, i) => (
            <li
              key={item.number}
              className={`partner__item reveal${inView ? ' is-in' : ''}`}
              data-delay={Math.min(4, i + 1)}
            >
              <span className="partner__num" aria-hidden="true">
                {item.number}
              </span>
              <h3 className="partner__item-title">{item.title}</h3>
              <p className="partner__item-body">{item.body}</p>
            </li>
          ))}
        </ol>

        <div className="partner__custom">
          <h3 className="display-md partner__custom-title">THERE&rsquo;S NO FIXED PACKAGE.</h3>
          <p className="prose">
            Every partnership at Recursion is shaped around what you bring. There are no pre-set
            slabs to pick from &mdash; reach out and we&rsquo;ll build the right fit for your company
            around the hackathon.
          </p>
          <ul className="partner__axes">
            {customPartnershipAxes.map((axis) => (
              <li key={axis} className="meta">
                {axis}
              </li>
            ))}
          </ul>
          <div className="partner__actions">
            <a className="btn btn--solid" href={partnerMailto}>
              <span>BECOME A PARTNER</span>
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a className="btn btn--ghost" href={`mailto:${event.email}`}>
              <span>{event.email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
