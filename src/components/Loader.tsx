import { useEffect, useState } from 'react';
import { event } from '../config/event';
import { useReducedMotion } from '../hooks/useReducedMotion';
import MicLogo from './MicLogo';

const SEEN_KEY = 'recursion:entered';

/**
 * Phase lengths in ms for a first visit. Repeat visits within the same session
 * run at REPEAT_SCALE so the sequence does not become a toll on every reload.
 * Tune the whole loader from these five numbers.
 */
const PHASES = {
  mic: 1700,
  define: 2200,
  title: 1300,
  out: 500,
} as const;

const REPEAT_SCALE = 0.4;

/** How deep the "see: recursion" definition nests itself. */
const NEST_DEPTH = 4;

type Phase = 'mic' | 'define' | 'title' | 'out';

/**
 * The definition renders itself. Each level is one call deeper, and the CSS
 * steps the scale and opacity down per level, so the entry visibly descends
 * into its own body rather than merely describing that it would.
 */
function NestedDefinition({ depth }: { depth: number }) {
  if (depth === 0) {
    return (
      <span className="loader__nest-end" aria-hidden="true">
        …
      </span>
    );
  }
  return (
    <span className="loader__nest" aria-hidden="true">
      <span className="loader__nest-line">
        <span className="loader__nest-arrow">↳</span>
        <span className="loader__nest-text">
          see: <em>recursion</em>
        </span>
      </span>
      <NestedDefinition depth={depth - 1} />
    </span>
  );
}

interface LoaderProps {
  onDone: () => void;
}

/**
 * Roughly 5.7s on a first visit, ~2.3s on repeat visits in the same session,
 * and skipped entirely under prefers-reduced-motion.
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
  const [phase, setPhase] = useState<Phase>('mic');
  const [depth, setDepth] = useState(0);

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

    const scale = repeat ? REPEAT_SCALE : 1;
    const timers: number[] = [];
    let at = 0;

    at += PHASES.mic * scale;
    timers.push(window.setTimeout(() => setPhase('define'), at));
    at += PHASES.define * scale;
    timers.push(window.setTimeout(() => setPhase('title'), at));
    at += PHASES.title * scale;
    timers.push(window.setTimeout(() => setPhase('out'), at));
    at += PHASES.out * scale;
    timers.push(window.setTimeout(onDone, at));

    // Descend for the whole run, so the readout never sits still.
    const tick = window.setInterval(() => setDepth((d) => d + 1), Math.max(55, at / 60));

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(tick);
    };
  }, [onDone, reduced, repeat]);

  if (reduced) return null;

  return (
    <div className={`loader loader--${phase}`} role="status" aria-live="polite">
      <div className="loader__rects" aria-hidden="true">
        {/* Delays spread evenly across the 2.6s loop so the rings arrive as one
            continuous descent rather than in a burst. */}
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="loader__rect" style={{ animationDelay: `${i * 0.52}s` }} />
        ))}
      </div>

      <div className="loader__readout">
        {phase === 'mic' && (
          <div className="loader__mic">
            <MicLogo className="loader__logo" />
            <span className="meta meta--faint">PRESENTED BY</span>
            <span className="loader__org">Microsoft Innovations Club</span>
            <span className="meta meta--faint">VIT CHENNAI</span>
          </div>
        )}

        {phase === 'define' && (
          <div className="loader__define">
            <p className="loader__entry">
              <span className="loader__entry-word">recursion</span>
              <span className="loader__entry-pos">noun</span>
            </p>
            <NestedDefinition depth={NEST_DEPTH} />
            <span className="sr-only">Recursion: see recursion.</span>
          </div>
        )}

        {(phase === 'title' || phase === 'out') && (
          <div className="loader__title">
            <span className="loader__name">{event.name}</span>
            <span className="meta">{event.edition}</span>
          </div>
        )}
      </div>

      <p className="loader__depth meta meta--red" aria-hidden="true">
        DEPTH {String(depth).padStart(4, '0')}
      </p>
      <span className="sr-only">Loading Recursion Edition II</span>
    </div>
  );
}
