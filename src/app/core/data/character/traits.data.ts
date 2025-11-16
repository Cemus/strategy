import { Trait } from '../../types/character/trait.interface';

export const traits: Trait[] = [
  {
    label: 'sage',
    description: 'A keen mind for both scholarship and statecraft.',
    statModifiers: {
      knowledge: 20,
      governance: 10,
    },
  },

  {
    label: 'courageous',
    description:
      'Not afraid of danger. Martial bonus but may take unnecessary risks.',
    statModifiers: {
      might: 20,
      knowledge: -5,
    },
  },
  {
    label: 'greedy',
    description:
      'Thinks about money first. Administration bonus but poor reputation.',
    statModifiers: {
      governance: 20,
      diplomacy: -20,
    },
  },
  {
    label: 'eloquent',
    description: 'Master of speech. Charisma bonus.',
    statModifiers: {
      diplomacy: 20,
    },
  },
  {
    label: 'lazy',
    description: 'Unmotivated. Reduces overall performance.',
    statModifiers: {
      might: -10,
      governance: -10,
    },
  },
  {
    label: 'genius',
    description: 'A brilliant mind. Massive knowledge bonus.',
    statModifiers: {
      knowledge: 30,
    },
  },
  {
    label: 'clumsy',
    description: 'Often makes mistakes.',
    statModifiers: {
      governance: -10,
      might: -10,
    },
  },
  {
    label: 'diligent',
    description: 'Works hard. Balanced bonus on multiple skills.',
    statModifiers: {
      governance: 20,
      might: 10,
    },
  },
  {
    label: 'cruel',
    description: 'Uses fear to control. Less charisma, more martial.',
    statModifiers: {
      might: 20,
      diplomacy: -20,
    },
  },
  {
    label: 'honest',
    description: 'Trustworthy. Liked but sometimes too blunt.',
    statModifiers: {
      diplomacy: -10,
      governance: 20,
    },
  },
  {
    label: 'schemer',
    description:
      'Plots behind the scenes. Bonus in knowledge and secret relations.',
    statModifiers: {
      knowledge: 10,
      diplomacy: 20,
    },
  },
];
