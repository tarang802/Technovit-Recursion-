import { useEffect, useState } from 'react';
import { stats } from '../data/content';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

function useCountUp(target: number, run: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!run) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration, reduced]);

  return value;
}

function Stat({ item, index }: { item: (typeof stats)[number]; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  // A fixed prefix (e.g. "550–") paired with a counted second number would
  // read as a nonsensical shrinking range mid-animation, so ranged stats
  // reveal at their final value instead of counting up.
  const animate = !item.prefix;
  const value = useCountUp(item.value, inView && animate, 1200 + index * 160);
  const formatted = (animate ? value : item.value).toLocaleString('en-IN');

  return (
    <div className={`stat reveal${inView ? ' is-in' : ''}`} ref={ref} data-delay={index}>
      <span className="stat__value" aria-hidden="true">
        {item.prefix ?? ''}
        {formatted}
        {item.suffix ?? ''}
      </span>
      <span className="sr-only">{item.display}</span>
      <span className="stat__label meta">{item.label}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <div className="stats">
      {stats.map((item, i) => (
        <Stat key={item.label} item={item} index={i} />
      ))}
    </div>
  );
}
