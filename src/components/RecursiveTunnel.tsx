import { useEffect, useRef } from 'react';
import type { TunnelGeometry } from '../data/tracks';
import type { Pointer } from '../hooks/useMousePosition';
import { useReducedMotion } from '../hooks/useReducedMotion';

export interface RecursiveTunnelProps {
  /** Number of nested rectangles drawn. Higher = deeper tunnel. */
  depth?: number;
  /** Cycles per second of the infinite zoom. */
  speed?: number;
  /** Overall brightness of the crimson ramp, 0–1.5. */
  intensity?: number;
  /** Per-layer sinusoidal displacement, in pixels at full amplitude. */
  distortion?: number;
  /** Per-layer rotation accumulation, in radians. */
  rotation?: number;
  /** Size multiplier of the outermost rectangle. */
  scale?: number;
  /** How far the tunnel drifts toward the pointer, in pixels. */
  mouseInfluence?: number;
  /** How much page scroll accelerates the descent. */
  scrollInfluence?: number;
  /** Which nested shape is drawn at each layer. */
  geometry?: TunnelGeometry;
  /** Centre of the tunnel as a fraction of the canvas, defaults to 0.5/0.5. */
  originX?: number;
  originY?: number;
  /** Shared pointer ref, so a page-wide listener drives many tunnels. */
  pointer?: React.MutableRefObject<Pointer>;
  /** Shared scroll-progress ref. */
  scroll?: React.MutableRefObject<number>;
  /** Extra progress added on top of scroll, e.g. hover state on a track. */
  boost?: number;
  className?: string;
}

const RAMP: Array<[number, [number, number, number]]> = [
  [0.0, [18, 0, 0]],
  [0.18, [58, 0, 0]],
  [0.42, [101, 0, 0]],
  [0.62, [154, 0, 0]],
  [0.78, [193, 18, 31]],
  [0.9, [70, 4, 6]],
  [1.0, [10, 0, 0]],
];

function rampColor(u: number, intensity: number): string {
  const t = ((u % 1) + 1) % 1;
  let lo = RAMP[0];
  let hi = RAMP[RAMP.length - 1];
  for (let i = 0; i < RAMP.length - 1; i++) {
    if (t >= RAMP[i][0] && t <= RAMP[i + 1][0]) {
      lo = RAMP[i];
      hi = RAMP[i + 1];
      break;
    }
  }
  const span = hi[0] - lo[0] || 1;
  const f = (t - lo[0]) / span;
  const r = Math.min(255, Math.round((lo[1][0] + (hi[1][0] - lo[1][0]) * f) * intensity));
  const g = Math.min(255, Math.round((lo[1][1] + (hi[1][1] - lo[1][1]) * f) * intensity));
  const b = Math.min(255, Math.round((lo[1][2] + (hi[1][2] - lo[1][2]) * f) * intensity));
  return `rgb(${r},${g},${b})`;
}

/** 160px tiling noise tile, generated once per mount. */
function makeGrain(): HTMLCanvasElement | null {
  if (typeof document === 'undefined') return null;
  const size = 160;
  const tile = document.createElement('canvas');
  tile.width = size;
  tile.height = size;
  const tctx = tile.getContext('2d');
  if (!tctx) return null;
  const img = tctx.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = (Math.random() * 255) | 0;
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 26;
  }
  tctx.putImageData(img, 0, 0);
  return tile;
}

function drawGeometry(
  ctx: CanvasRenderingContext2D,
  geometry: TunnelGeometry,
  w: number,
  h: number,
  stroke: string,
) {
  if (geometry === 'square') return;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = Math.max(0.6, w * 0.004);
  ctx.globalAlpha = 0.5;

  if (geometry === 'window') {
    const bar = h * 0.09;
    ctx.beginPath();
    ctx.moveTo(-w / 2, -h / 2 + bar);
    ctx.lineTo(w / 2, -h / 2 + bar);
    ctx.stroke();
  } else if (geometry === 'grid') {
    ctx.beginPath();
    for (let i = 1; i < 3; i++) {
      const x = -w / 2 + (w / 3) * i;
      const y = -h / 2 + (h / 3) * i;
      ctx.moveTo(x, -h / 2);
      ctx.lineTo(x, h / 2);
      ctx.moveTo(-w / 2, y);
      ctx.lineTo(w / 2, y);
    }
    ctx.stroke();
  } else if (geometry === 'pulse') {
    const steps = 24;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const x = -w / 2 + (w / steps) * i;
      const p = i / steps;
      const spike = p > 0.44 && p < 0.56 ? Math.sin((p - 0.44) * (Math.PI / 0.12)) : 0;
      ctx.lineTo(x, -spike * h * 0.22);
    }
    ctx.stroke();
  } else if (geometry === 'node') {
    const r = Math.max(1, w * 0.012);
    const pts: Array<[number, number]> = [
      [-w / 2, -h / 2],
      [w / 2, -h / 2],
      [w / 2, h / 2],
      [-w / 2, h / 2],
    ];
    ctx.fillStyle = stroke;
    for (const [x, y] of pts) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

export default function RecursiveTunnel({
  depth = 16,
  speed = 0.07,
  intensity = 1,
  distortion = 0,
  rotation = 0,
  scale = 1,
  mouseInfluence = 0,
  scrollInfluence = 0,
  geometry = 'square',
  originX = 0.5,
  originY = 0.5,
  pointer,
  scroll,
  boost = 0,
  className,
}: RecursiveTunnelProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  // Live props for the animation loop, so changing a prop never restarts it.
  const cfg = useRef({
    depth,
    speed,
    intensity,
    distortion,
    rotation,
    scale,
    mouseInfluence,
    scrollInfluence,
    geometry,
    originX,
    originY,
    boost,
  });
  cfg.current = {
    depth,
    speed,
    intensity,
    distortion,
    rotation,
    scale,
    mouseInfluence,
    scrollInfluence,
    geometry,
    originX,
    originY,
    boost,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const grain = makeGrain();
    const grainPattern = grain ? ctx.createPattern(grain, 'repeat') : null;

    const coarse =
      typeof window.matchMedia === 'function' && window.matchMedia('(max-width: 768px)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);

    let w = 0;
    let h = 0;
    let frac = 0;
    let smoothX = 0;
    let smoothY = 0;
    let smoothBoost = 0;
    let last = performance.now();
    let raf = 0;
    let visible = true;
    let grainFrame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (dt: number) => {
      const c = cfg.current;
      const K = 0.78;

      const scrollValue = scroll ? scroll.current : 0;
      const targetBoost = c.boost + scrollValue * c.scrollInfluence;
      smoothBoost += (targetBoost - smoothBoost) * Math.min(1, dt * 3);

      const px = pointer && pointer.current.active ? pointer.current.x : 0;
      const py = pointer && pointer.current.active ? pointer.current.y : 0;
      smoothX += (px - smoothX) * Math.min(1, dt * 2.4);
      smoothY += (py - smoothY) * Math.min(1, dt * 2.4);

      const cx = w * c.originX + smoothX * c.mouseInfluence;
      const cy = h * c.originY + smoothY * c.mouseInfluence * 0.7;
      const base = Math.max(w, h) * 1.35 * c.scale;
      const aspect = h / Math.max(1, w);
      // Boost still drives motion at full strength, but its effect on brightness
      // is capped: scrollInfluence grows with page depth, and without a ceiling
      // the ramp saturates to flat red and swallows the text over the tunnel.
      const live = c.intensity * (1 + Math.min(smoothBoost, 0.5) * 0.35);

      ctx.clearRect(0, 0, w, h);

      const layers = c.depth + 1;
      for (let i = 0; i < layers; i++) {
        const d = i - frac;
        const s = Math.pow(K, d);
        const rw = base * s;
        const rh = base * s * (0.62 + aspect * 0.5);
        if (rw < 1.2) continue;

        const u = d / c.depth;
        ctx.fillStyle = rampColor(u, live);

        const wob = c.distortion
          ? Math.sin(frac * 2.1 + i * 0.9) * c.distortion * (1 - Math.min(1, i / layers))
          : 0;
        const wobY = c.distortion ? Math.cos(frac * 1.7 + i * 0.7) * c.distortion * 0.6 : 0;

        ctx.save();
        ctx.translate(cx + wob + smoothX * i * 0.55, cy + wobY + smoothY * i * 0.4);
        if (c.rotation) ctx.rotate(c.rotation * d + smoothX * 0.02);
        ctx.fillRect(-rw / 2, -rh / 2, rw, rh);
        if (c.geometry !== 'square' && rw > 40) {
          drawGeometry(ctx, c.geometry, rw, rh, rampColor(u + 0.12, live * 1.2));
        }
        ctx.restore();
      }

      // Atmospheric bloom pulled toward the vanishing point.
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.55);
      glow.addColorStop(0, `rgba(193,18,31,${0.16 * live})`);
      glow.addColorStop(0.45, `rgba(101,0,0,${0.07 * live})`);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';

      // Film grain, refreshed on alternating frames only.
      if (grainPattern) {
        grainFrame = (grainFrame + 1) % 2;
        const ox = grainFrame === 0 ? 0 : 37;
        ctx.save();
        ctx.globalAlpha = 0.55;
        ctx.translate(-ox, -ox);
        ctx.fillStyle = grainPattern;
        ctx.fillRect(0, 0, w + 80, h + 80);
        ctx.restore();
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible && !document.hidden) {
        frac = (frac + dt * cfg.current.speed * (1 + smoothBoost * 0.9)) % 1;
        render(dt);
      }
      raf = requestAnimationFrame(loop);
    };

    resize();

    if (reduced) {
      // One static frame. No loop, no motion, artwork still present.
      frac = 0.35;
      render(0);
      const onResizeStatic = () => {
        resize();
        render(0);
      };
      window.addEventListener('resize', onResizeStatic);
      return () => window.removeEventListener('resize', onResizeStatic);
    }

    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 })
        : null;
    observer?.observe(canvas);

    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [reduced, pointer, scroll]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
