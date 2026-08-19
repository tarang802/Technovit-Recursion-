/** Editorial content blocks sourced from the official prospectus. */

export interface NumberedItem {
  number: string;
  title: string;
  body: string;
}

export const judgingRounds: NumberedItem[] = [
  { number: '01', title: 'INITIAL IDEA', body: '4:00 PM' },
  { number: '02', title: 'PROGRESS REVIEW', body: '12:00 AM' },
  { number: '03', title: 'FINAL PITCH', body: '10:30 AM' },
];

export const judgingCriteria = ['INNOVATION', 'IMPLEMENTATION', 'IMPACT', 'PRESENTATION'];

export const judgingInvolves = [
  'Join any of Recursion\u2019s three rounds — Initial Idea (4:00 PM), Progress Review (12:00 AM) or the Final Pitch (10:30 AM).',
  'Evaluate teams at their workspace or on stage, depending on the round.',
  'Offer feedback that helps first-time builders grow.',
  'Pick the slot that fits your schedule — no need to stay the full 24 hours.',
];

export const judgeBenefits: NumberedItem[] = [
  {
    number: '01',
    title: 'DIRECT VISIBILITY',
    body: 'Direct visibility with 550–650 of the region\u2019s top student builders.',
  },
  {
    number: '02',
    title: 'BRAND CREDIT',
    body: 'Speaking and brand credit across Recursion\u2019s promotion.',
  },
  {
    number: '03',
    title: 'FLAGSHIP ACCESS',
    body: 'A seat inside TechnoVIT 2026\u2019s flagship overnight event.',
  },
  {
    number: '04',
    title: 'HOSPITALITY',
    body: 'Hospitality, meals and on-campus support through the event.',
  },
];

export const challengeSteps: NumberedItem[] = [
  {
    number: '01',
    title: 'SET THE PROBLEM STATEMENT',
    body: 'Bring a real challenge from inside your company and have hundreds of builders compete to solve it, live.',
  },
  {
    number: '02',
    title: 'JUDGE WITH YOUR OWN TEAM',
    body: 'Send your engineers, designers or product leads to sit on the panel and evaluate the builds against your bar.',
  },
  {
    number: '03',
    title: 'HANDPICK THE TALENT',
    body: 'Shortlist and connect directly with the builders and projects that impress your team the most — before anyone else does.',
  },
  {
    number: '04',
    title: '24 HOURS, FULLY ON-GROUND',
    body: 'One continuous overnight build — your brand embedded in the room for the full duration, not a one-hour drop-in.',
  },
];

export const partnerBenefits: NumberedItem[] = [
  {
    number: '01',
    title: 'BRAND VISIBILITY',
    body: 'Logo placement across the venue, stage backdrops, event collateral, social promotion and the official Recursion poster and merchandise.',
  },
  {
    number: '02',
    title: 'ON-GROUND ACTIVATION',
    body: 'Dedicated booth space, product demos, swag drops or a branded challenge track in front of 550–650 shortlisted builders on-site.',
  },
  {
    number: '03',
    title: 'DIRECT TALENT ACCESS',
    body: 'First-look access to a curated pool of technical talent for internships and hiring — resumes, portfolios and live project demos included.',
  },
  {
    number: '04',
    title: 'PARTICIPANT ENGAGEMENT',
    body: 'Workshops, mentoring slots or an “Ask Me Anything” session that puts your engineers in direct conversation with 3,500+ registered developers.',
  },
  {
    number: '05',
    title: 'CUSTOM PARTNERSHIP',
    body: 'There is no fixed package. Every partnership is shaped around what you bring — a problem statement, a panel of judges, a prize, a challenge track, a brand activation, or all of them.',
  },
];

export const customPartnershipAxes = [
  'PROBLEM STATEMENT',
  'JUDGES',
  'PRIZE',
  'CHALLENGE TRACK',
  'BRAND ACTIVATION',
];

export const stats = [
  { value: 3500, suffix: '+', display: '3,500+', label: 'REGISTRATIONS RECEIVED FOR EDITION I' },
  { value: 650, prefix: '550–', display: '550–650', label: 'BUILDERS SHORTLISTED FOR THE FINAL HACKATHON' },
  { value: 24, display: '24', label: 'HOURS OF NON-STOP, ON-GROUND BUILDING' },
  { value: 1, display: '1', label: 'ONLY OVERNIGHT FLAGSHIP EVENT AT TECHNOVIT 2026' },
];
