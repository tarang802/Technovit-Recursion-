/**
 * SINGLE SOURCE OF TRUTH FOR EVENT INFORMATION.
 *
 * Every component reads from here. Change a value once and it updates
 * everywhere on the site. Do not hard-code event copy inside components.
 */

/**
 * REGISTRATION_URL
 * ----------------
 * There is no verified public registration URL for Edition II yet, so this
 * points at the on-page #registration anchor. When the real link exists
 * (Devfolio, Unstop, a Google Form, anything), replace the string below with
 * the absolute URL — e.g. "https://recursion-vitc.devfolio.co".
 *
 * Every "Enter Recursion" / "Register" button on the site reads this value.
 * External URLs automatically open in a new tab; internal anchors smooth-scroll.
 * You do not need to touch any component.
 */
export const REGISTRATION_URL = '#registration';

export const isExternalRegistration = !REGISTRATION_URL.startsWith('#');

/**
 * Where the primary "Enter Recursion" CTA points while registration is not yet
 * open. Sending it to #registration dropped the visitor at the foot of the page
 * on a "details will be announced" panel — a dead end. It now opens the walk
 * through the event instead: about → philosophy → tracks → experience →
 * schedule, which is the actual answer to "what is this?".
 *
 * The moment REGISTRATION_URL becomes a real absolute URL this is bypassed and
 * every CTA goes straight to the live registration link.
 */
export const TOUR_START_URL = '#about';

/** Resolved target for every "Enter Recursion" / "Register" button. */
export const primaryCtaHref = isExternalRegistration ? REGISTRATION_URL : TOUR_START_URL;

export const event = {
  name: 'RECURSION',
  edition: 'EDITION II',
  editionNumeral: 'II',
  organizer: 'Microsoft Innovations Club, VIT Chennai',
  organizerShort: 'Microsoft Innovations Club',
  festival: 'TechnoVIT 2026',
  format: '24-Hour Offline Hackathon',
  date: '3–4 September 2026',
  dateShort: '3–4 SEP 2026',
  dateISO: '2026-09-03',
  venue: 'VIT Chennai',
  duration: '24 HOURS',
  prizePool: '₹10,00,000',
  prizePoolLabel: 'IN TECH CREDITS',
  registrations: '3,500+',
  shortlisted: '550–650',
  audience: 'Developers, designers, innovators & builders',
  tagline: 'CALLS ITSELF AT TECHNO.',
  philosophy: ['BUILD.', 'BREAK.', 'TEST.', 'SHIP.', 'REPEAT.'],
  clockLine: 'Once the clock starts, it calls itself again.',
  closingLine: "ONCE THE CLOCK STARTS, IT'S ON.",
  heroSupport: '24 hours to take an idea and turn it into something real.',
  email: 'mic.vit.chennai@gmail.com',
  linkedin: 'https://linkedin.com/company/microsoft-innovations-club-vitc',
  instagram: 'https://instagram.com/microsoft.innovations.vitc',
  registrationUrl: REGISTRATION_URL,
} as const;

export const partnerMailto =
  `mailto:${event.email}` +
  `?subject=${encodeURIComponent('Partnership enquiry — Recursion Edition II')}` +
  `&body=${encodeURIComponent(
    'Company:\nWhat we would like to bring (problem statement / judges / prize / challenge track / activation):\nContact person:\nPhone:\n',
  )}`;

export const judgeMailto =
  `mailto:${event.email}` +
  `?subject=${encodeURIComponent('Judging enquiry — Recursion Edition II')}` +
  `&body=${encodeURIComponent(
    'Name:\nOrganisation:\nRole:\nPreferred round (Initial Idea 4:00 PM / Progress Review 12:00 AM / Final Pitch 10:30 AM):\n',
  )}`;

export const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'TRACKS', href: '#tracks' },
  { label: 'SCHEDULE', href: '#schedule' },
  { label: 'JUDGING', href: '#judging' },
] as const;
