export type TunnelGeometry = 'square' | 'window' | 'grid' | 'pulse' | 'node';

export interface Track {
  id: string;
  number: string;
  title: string;
  description: string;
  core: string;
  geometry: TunnelGeometry;
  geometryLabel: string;
}

/**
 * The five official competition tracks, from the Recursion — Edition II
 * competition brief. These are NOT from the sponsorship prospectus.
 * There is no sixth track.
 */
export const tracks: Track[] = [
  {
    id: 'open-innovation',
    number: '01',
    title: 'OPEN INNOVATION',
    description:
      'Anything outside the tracks, any domain, with a local or open source model at the core.',
    core: 'LOCAL + OPEN SOURCE MODELS',
    geometry: 'square',
    geometryLabel: 'INFINITE SQUARE',
  },
  {
    id: 'developer-tools',
    number: '02',
    title: 'DEVELOPER TOOLS',
    description:
      'Build tools that help developers create, test, deploy, or collaborate faster using AI.',
    core: 'CREATE / TEST / DEPLOY / COLLABORATE',
    geometry: 'window',
    geometryLabel: 'NESTED TERMINAL',
  },
  {
    id: 'fintech-commerce',
    number: '03',
    title: 'FINTECH & COMMERCE',
    description:
      'Money, payments, commerce, lending, investing, and financial inclusion — built for how India actually transacts.',
    core: 'PAYMENTS / LENDING / INCLUSION',
    geometry: 'grid',
    geometryLabel: 'TRANSACTION LATTICE',
  },
  {
    id: 'health-tech',
    number: '04',
    title: 'HEALTH TECH',
    description:
      'Build AI-powered healthcare, wellness, fitness, or mental health solutions.',
    core: 'HEALTHCARE / WELLNESS / MENTAL HEALTH',
    geometry: 'pulse',
    geometryLabel: 'RECURSIVE PULSE',
  },
  {
    id: 'smart-living',
    number: '05',
    title: 'SMART LIVING',
    description:
      'Design AI-powered solutions for smart homes, IoT, connected devices, or everyday convenience.',
    core: 'SMART HOMES / IOT / CONNECTED DEVICES',
    geometry: 'node',
    geometryLabel: 'CONNECTED NODES',
  },
];
