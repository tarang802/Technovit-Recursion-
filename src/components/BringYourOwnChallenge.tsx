import { challengeSteps } from '../data/content';
import { partnerMailto } from '../config/event';
import { useInView } from '../hooks/useInView';

export default function BringYourOwnChallenge() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section className="section section--byoc">
      <div className="shell" ref={ref}>
        <div className="eyebrow">
          <span className="eyebrow__index">05</span>
          <span className="meta">BRING YOUR OWN CHALLENGE</span>
          <span className="eyebrow__rule" />
        </div>

        <h2 className={`display-md byoc__title reveal${inView ? ' is-in' : ''}`}>
          DON&rsquo;T JUST SPONSOR THE HACKATHON.
          <br />
          <span className="red">SHAPE WHAT GETS BUILT.</span>
        </h2>

        <p className={`prose byoc__lede reveal${inView ? ' is-in' : ''}`} data-delay="1">
          Recursion doesn&rsquo;t lock its problem statements in advance. Bring a real problem
          statement straight from your company, put your own engineers or product leads on the
          judging panel, and handpick the projects and builders you want to look at more closely
          &mdash; a direct line from problem, to prototype, to potential hire.
        </p>

        <ol className="byoc__steps">
          {challengeSteps.map((step, i) => (
            <li
              key={step.number}
              className={`byoc__step reveal${inView ? ' is-in' : ''}`}
              data-delay={Math.min(4, i + 1)}
            >
              <span className="byoc__num" aria-hidden="true">
                {step.number}
              </span>
              <h3 className="byoc__step-title">{step.title}</h3>
              <p className="byoc__step-body">{step.body}</p>
            </li>
          ))}
        </ol>

        <a className="btn byoc__cta" href={partnerMailto}>
          <span>BRING A PROBLEM STATEMENT</span>
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
