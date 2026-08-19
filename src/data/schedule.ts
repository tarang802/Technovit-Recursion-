export interface ScheduleEntry {
  time: string;
  title: string;
  detail: string;
  marker?: boolean;
}

export interface ScheduleDay {
  day: string;
  dayLabel: string;
  entries: ScheduleEntry[];
}

/**
 * Event flow exactly as published in the official sponsorship prospectus.
 * No invented entries.
 */
export const schedule: ScheduleDay[] = [
  {
    day: 'SEPTEMBER 3',
    dayLabel: 'DAY / 01',
    entries: [
      {
        time: '12:00–1:00 PM',
        title: 'REGISTRATION & SEATING',
        detail:
          'Participants arrive, complete registration and verification, confirm teams, and move to their allotted seating.',
      },
      {
        time: '1:00–1:30 PM',
        title: 'INAUGURATION CEREMONY',
        detail: 'Chief guests take the stage for welcome remarks, introductions and opening speeches.',
      },
      {
        time: '1:30 PM',
        title: 'OFFICIAL KICK-OFF',
        detail:
          'Problem statements are revealed and hacking begins. The Initial Evaluation PPT template is issued to every team.',
        marker: true,
      },
      {
        time: '1:30–4:00 PM',
        title: 'DEVELOPMENT — ROUND 1',
        detail: 'Teams build out their initial idea and prototype against their problem statement.',
      },
      {
        time: '4:00 PM',
        title: 'ROUND 1 EVALUATION',
        detail:
          'Judges visit each team at their workspace, evaluating problem understanding, proposed solution and the initial PPT.',
        marker: true,
      },
      {
        time: 'AFTER 4:00 PM',
        title: 'DEVELOPMENT — ROUND 2',
        detail: 'Teams refine and extend their build based on Round 1 feedback.',
      },
    ],
  },
  {
    day: 'SEPTEMBER 4',
    dayLabel: 'DAY / 02',
    entries: [
      {
        time: '12:00 AM',
        title: 'ROUND 2 EVALUATION',
        detail: 'A fresh judging panel reviews progress, implementation and functionality.',
        marker: true,
      },
      {
        time: '12:00–10:00 AM',
        title: 'FINAL DEVELOPMENT',
        detail: 'Teams complete their projects and prepare their final presentations.',
      },
      {
        time: '10:00 AM',
        title: 'FINAL JURY ARRIVAL',
        detail: 'Judges from partner companies and organisations arrive and are introduced to the floor.',
      },
      {
        time: '10:30 AM',
        title: 'TOP 10 FINAL PITCHES',
        detail: 'Shortlisted teams present their completed projects to the final judging panel.',
        marker: true,
      },
      {
        time: '10:30–11:30 AM',
        title: 'FINAL JUDGING',
        detail: 'Projects are scored on innovation, implementation, impact and presentation.',
      },
      {
        time: '~11:30 AM',
        title: 'FELICITATION',
        detail: 'Mementos and thanks presented to judges, guests and mentors.',
      },
      {
        time: '~11:45 AM',
        title: 'RESULTS & WINNERS',
        detail: 'Winning and finalist teams are announced.',
      },
      {
        time: '12:00 PM',
        title: 'HACKATHON CONCLUDES',
        detail: 'Official closing of Recursion — Edition II.',
      },
    ],
  },
];

export const overallFlow = [
  'Registration',
  'Inauguration',
  'Kick-Off',
  'Development',
  'Round 1',
  'Development',
  'Round 2',
  'Final Development',
  'Jury Introduction',
  'Top 10 Pitches',
  'Final Judging',
  'Felicitation',
  'Results',
  'Closing',
];
