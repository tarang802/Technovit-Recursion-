import { useEffect, useRef } from 'react';

export interface Pointer {
  /** -1 .. 1 relative to viewport centre */
  x: number;
  y: number;
  active: boolean;
}

/**
 * Pointer position as a ref, not state — reading it inside a rAF loop must not
 * trigger a React render on every mousemove.
 */
export function useMousePosition(enabled = true) {
  const pointer = useRef<Pointer>({ x: 0, y: 0, active: false });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.current.active = true;
    };
    const onLeave = () => {
      pointer.current.active = false;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  return pointer;
}
