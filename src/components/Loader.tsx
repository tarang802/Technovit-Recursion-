import { useEffect, useState } from 'react';
import { event } from '../config/event';
import { useReducedMotion } from '../hooks/useReducedMotion';

const SEEN_KEY = 'recursion:entered';

interface LoaderProps {
  onDone: () => void;
}

/**
 * Roughly 1.9s on a first visit, ~350ms on repeat visits, and skipped entirely
 * under prefers-reduced-motion.
 */
export default function Loader({ onDone }: LoaderProps) {
  const reduced = useReducedMotion();
  const [repeat] = useState(() => {
    try {
      return sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [depth, setDepth] = useState(0);
  const [phase, setPhase] = useState<'count' | 'title' | 'out'>('count');

  useEffect(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* storage blocked — loader simply runs again next time */
    }

    if (reduced) {
      onDone();
      return;
    }

    const step = repeat ? 45 : 150;
    const timers: number[] = [];
    for (let i = 1; i <= 4; i++) {
      timers.push(window.setTimeout(() => setDepth(i), step * i));
    }
    timers.push(window.setTimeout(() => setPhase('title'), step * 4 + 120));
    timers.push(window.setTimeout(() => setPhase('out'), step * 4 + (repeat ? 240 : 900)));
    timers.push(window.setTimeout(onDone, step * 4 + (repeat ? 480 : 1300)));
    return () => timers.forEach(clearTimeout);
  }, [onDone, reduced, repeat]);

  if (reduced) return null;

  return (
    <div className={`loader loader--${phase}`} role="status" aria-live="polite">
      <div className="loader__rects" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="loader__rect" style={{ animationDelay: `${i * 0.09}s` }} />
        ))}
      </div>

      <div className="loader__readout">
        {phase === 'count' ? (
          <>
            <p className="meta meta--red">INITIALIZING RECURSION…</p>
            <p className="loader__depth">
              DEPTH {String(depth).padStart(4, '0')}
            </p>
          </>
        ) : (
          <div className="loader__title">
            <span className="loader__name">{event.name}</span>
            <span className="meta">{event.edition}</span>
          </div>
        )}
      </div>
      <span className="sr-only">Loading Recursion Edition II</span>
    </div>
  );
}
