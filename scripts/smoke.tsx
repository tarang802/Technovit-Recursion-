/**
 * Headless smoke test: mounts the whole app in jsdom, runs every effect, and
 * fails on any console error/warning or thrown exception.
 *   npx tsx scripts/smoke.tsx
 */
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'https://recursion.test/',
  pretendToBeVisual: true,
});

const g = globalThis as any;
g.window = dom.window;
g.document = dom.window.document;
Object.defineProperty(g, 'navigator', { value: dom.window.navigator, configurable: true });
g.HTMLElement = dom.window.HTMLElement;
g.Element = dom.window.Element;
g.Node = dom.window.Node;
g.getComputedStyle = dom.window.getComputedStyle;
g.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(() => cb(performance.now()), 16) as unknown as number;
g.cancelAnimationFrame = (id: number) => clearTimeout(id);
g.IntersectionObserver = class {
  constructor(private cb: (e: unknown[]) => void) {}
  observe() { this.cb([{ isIntersecting: true }]); }
  unobserve() {}
  disconnect() {}
};
dom.window.matchMedia = ((q: string) => ({
  matches: false,
  media: q,
  onchange: null,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
  dispatchEvent: () => false,
})) as any;
g.matchMedia = dom.window.matchMedia;
g.IntersectionObserver = g.IntersectionObserver;

const problems: string[] = [];
const origError = console.error;
const origWarn = console.warn;
const IGNORE = /getContext\(\) method/; // jsdom has no canvas backend; the app handles a null context
console.error = (...a: unknown[]) => {
  const msg = a.join(' ');
  if (!IGNORE.test(msg)) { problems.push('ERROR ' + msg); origError(...a); }
};
console.warn = (...a: unknown[]) => { problems.push('WARN  ' + a.join(' ')); origWarn(...a); };

const { createRoot } = await import('react-dom/client');
const React = await import('react');
const { default: App } = await import('../src/App');

const root = createRoot(document.getElementById('root')!);
root.render(React.createElement(App));

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const phase = () => {
  const el = document.querySelector('.loader');
  if (!el) return 'gone';
  return ([...el.classList].find((c) => c.startsWith('loader--')) ?? '').replace('loader--', '');
};
const readout = () => document.querySelector('.loader__readout')?.textContent ?? '';

// Walk the loader sequence. Boundaries come from PHASES in Loader.tsx:
// mic 0-1700, define 1700-3900, title 3900-5200, out 5200-5700.
await sleep(300);
const L1 = { phase: phase(), text: readout(), html: document.body.innerHTML };
await sleep(1850);
const L2 = { phase: phase(), text: readout() };
await sleep(2100);
const L3 = { phase: phase(), text: readout() };
await sleep(2300);
const L4 = { phase: phase() };

const html = document.getElementById('root')!.innerHTML;
const checks: Array<[string, boolean]> = [
  ['hero renders', html.includes('RECURSION')],
  ['canonical date present', html.includes('3–4 SEPTEMBER 2026') || html.includes('3–4 September 2026')],
  ['poster date absent', !/AUGUST\s*2026/i.test(html) && !/29\s*[–-]\s*30/.test(html)],
  ['five tracks', (html.match(/Track 0[1-5]:/g) || []).length === 5],
  ['no sixth track', !html.includes('Track 06')],
  ['full schedule', (html.match(/class="clock__entry[ "]/g) || []).length === 14],
  ['judging section', html.includes('THREE ROUNDS')],
  // The sponsor-facing sections (Bring Your Own Challenge, Call for Judges,
  // Partner With Us) were all cut; the site is participant-facing only.
  ['byoc section absent', !html.includes('SHAPE WHAT GETS BUILT')],
  ['judges section absent', !html.includes('FLAGSHIP ACCESS')],
  ['partner section absent', !html.includes('BECOME A PARTNER')],
  ['no dead partner anchor', !html.includes('href="#partner"')],
  ['section numbering continuous', /eyebrow__index">0[1-7]</.test(html) && !/eyebrow__index">(08|09|10)</.test(html)],
  ['prize pool', html.includes('₹10,00,000')],
  // Until a real registration URL exists the primary CTA opens the event tour
  // rather than dead-ending on the "to be announced" panel.
  ['primary cta starts tour', html.includes('href="#about"')],
  ['no dead-end registration cta', !html.includes('href="#registration"')],
  ['footer loop', html.includes('ENTER AGAIN')],
  ['no lorem', !/lorem ipsum/i.test(html)],
  ['no TODO', !/TODO|Coming soon/i.test(html)],

  // Loader sequence: MIC credit, the self-referential definition, then title.
  ['loader opens on mic credit', L1.phase === 'mic' && /PRESENTED BY/i.test(L1.text)],
  ['loader credits the club', /Microsoft Innovations Club/i.test(L1.text)],
  ['loader shows mic logo', /mic_logo_pixel\.png/.test(L1.html)],
  ['loader reaches definition', L2.phase === 'define' && /recursion/i.test(L2.text)],
  ['definition recurses into itself', (L2.text.match(/see:/g) ?? []).length >= 3],
  ['loader reaches title', L3.phase === 'title' || L3.phase === 'out'],
  ['loader finishes and unmounts', L4.phase === 'gone'],
];

let failed = 0;
for (const [name, ok] of checks) {
  if (!ok) { failed++; origError('  FAIL  ' + name); } else { console.log('  pass  ' + name); }
}

root.unmount();

if (problems.length) {
  origError('\nConsole output during mount:');
  problems.forEach((p) => origError('  ' + p));
}
origError(`\n${failed} content check(s) failed, ${problems.length} console message(s).`);
process.exit(failed || problems.length ? 1 : 0);
