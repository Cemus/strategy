import { Trait } from '../../types/character/trait.interface';

export const traits: Trait[] = [
  {
    label: 'sage',
    description: 'A keen mind for both scholarship and statecraft.',
    statModifiers: {
      intelligence: 2,
      leadership: 1,
    },
  },
  {
    label: 'courageous',
    description: 'Not afraid of danger.',
    statModifiers: {
      might: 1,
      leadership: 2,
    },
  },
  {
    label: 'greedy',
    description:
      'Obsessed with wealth and personal gain. Excels at economic matters but lacks loyalty.',
    statModifiers: {
      intelligence: 1,
      leadership: -1,
    },
  },
  {
    label: 'eloquent',
    description: 'Master of speech. Charisma bonus.',
    statModifiers: {
      charisma: 3,
    },
  },
  {
    label: 'lazy',
    description: 'Unmotivated. Reduces overall performance.',
    statModifiers: {
      endurance: -2,
      leadership: -1,
    },
  },
  {
    label: 'genius',
    description: 'A brilliant mind. Massive intelligence bonus.',
    statModifiers: {
      intelligence: 5,
    },
  },
  {
    label: 'clumsy',
    description: 'Often makes mistakes.',
    statModifiers: {
      leadership: -1,
      might: -1,
    },
  },
  {
    label: 'diligent',
    description: 'Works hard. Balanced bonus on multiple skills.',
    statModifiers: {
      endurance: 2,
      might: 1,
    },
  },
  {
    label: 'cruel',
    description: 'Uses fear to control. Less charisma, more martial.',
    statModifiers: {
      might: 4,
      leadership: 1,
      charisma: -2,
    },
  },
  {
    label: 'honest',
    description: 'Trustworthy.',
    statModifiers: {
      leadership: 2,
      charisma: 1,
    },
  },
  {
    label: 'schemer',
    description:
      'Plots behind the scenes. Bonus in intelligence and secret relations.',
    statModifiers: {
      intelligence: 2,
      charisma: -1,
      agility: 2,
    },
  },
  {
    label: 'ambitious',
    description:
      'Seeks power and recognition. Strong leader but harder to control.',
    statModifiers: {
      leadership: 2,
      charisma: 1,
    },
  },
  {
    label: 'disciplined',
    description:
      'Maintains strict standards and performs reliably under pressure.',
    statModifiers: {
      endurance: 2,
      leadership: 1,
    },
  },
  {
    label: 'reckless',
    description:
      'Acts without hesitation. Fearless but often takes unnecessary risks.',
    statModifiers: {
      might: 2,
      agility: 1,
      intelligence: -1,
    },
  },
  {
    label: 'coward',
    description:
      'Avoids danger whenever possible. Poor warrior but careful planner.',
    statModifiers: {
      might: -2,
      intelligence: 1,
      agility: 1,
    },
  },
  {
    label: 'tactician',
    description:
      'A skilled battlefield commander who excels at planning engagements.',
    statModifiers: {
      intelligence: 2,
      leadership: 2,
    },
  },
  {
    label: 'warrior',
    description: 'A veteran fighter with exceptional physical abilities.',
    statModifiers: {
      might: 3,
      endurance: 1,
    },
  },
  {
    label: 'athletic',
    description: 'Physically gifted and capable of enduring harsh conditions.',
    statModifiers: {
      endurance: 2,
      agility: 1,
    },
  },
  {
    label: 'nimble',
    description: 'Fast and precise. Excels at infiltration and quick actions.',
    statModifiers: {
      agility: 3,
    },
  },
  {
    label: 'spy',
    description: 'Skilled at gathering information and operating in secrecy.',
    statModifiers: {
      agility: 2,
      intelligence: 2,
    },
  },
  {
    label: 'merchant',
    description: 'Understands trade and economic opportunities.',
    statModifiers: {
      intelligence: 2,
      charisma: 1,
    },
  },
  {
    label: 'corrupt',
    description:
      'Uses authority for personal benefit. Effective but unreliable.',
    statModifiers: {
      charisma: 1,
      leadership: -2,
      intelligence: 1,
    },
  },
  {
    label: 'loyal',
    description: 'Faithful to their lord and unlikely to betray their faction.',
    statModifiers: {
      leadership: 1,
      endurance: 1,
    },
  },
  {
    label: 'fierce',
    description: 'Intimidating presence on and off the battlefield.',
    statModifiers: {
      might: 2,
      charisma: -1,
      leadership: 1,
    },
  },
  {
    label: 'patient',
    description: 'Waits for the perfect moment before acting.',
    statModifiers: {
      intelligence: 2,
      endurance: 1,
    },
  },
  {
    label: 'ambassador',
    description: 'A natural negotiator skilled at maintaining relationships.',
    statModifiers: {
      charisma: 3,
      leadership: 1,
    },
  },
  {
    label: 'scholar',
    description:
      'A learned individual with deep knowledge and strategic insight.',
    statModifiers: {
      intelligence: 3,
      charisma: 1,
    },
  },
  {
    label: 'veteran',
    description: 'Years of experience have made this officer reliable in war.',
    statModifiers: {
      might: 1,
      endurance: 2,
      leadership: 1,
    },
  },
];
