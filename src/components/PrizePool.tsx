import { event } from '../config/event';
import type { Pointer } from '../hooks/useMousePosition';
import { useInView } from '../hooks/useInView';
import RecursiveTunnel from './RecursiveTunnel';

interface PrizePoolProps {
  pointer: React.MutableRefObject<Pointer>;
  scroll: React.MutableRefObject<number>;
}

export default function PrizePool({ pointer, scroll }: PrizePoolProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <section className="section section--prize">
      <div className="tunnel-layer prize__tunnel" aria-hidden="true">
        <RecursiveTunnel
          className="tunnel-canvas"
          depth={22}
          speed={0.05}
          intensity={0.62}
          distortion={10}
          rotation={0.002}
          scale={1.15}
          mouseInfluence={34}
          scrollInfluence={0.5}
          pointer={pointer}
          scroll={scroll}
        />
      </div>

      <div className="shell prize__inner" ref={ref}>
        <span className="meta meta--red">TOTAL PRIZE POOL</span>
        <p className={`prize__amount reveal${inView ? ' is-in' : ''}`}>{event.prizePool}</p>
        <span className={`prize__label meta reveal${inView ? ' is-in' : ''}`} data-delay="1">
          {event.prizePoolLabel}
        </span>
        <h2 className={`display-md prize__line reveal${inView ? ' is-in' : ''}`} data-delay="2">
          BUILD SOMETHING
          <br />
          WORTH REMEMBERING.
        </h2>
      </div>
    </section>
  );
}
