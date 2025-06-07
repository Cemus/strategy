import { CharacterStats } from '../models/character/character-stats.model';
import { Character } from '../models/character/character.model';
import { Trait } from '../types/trait.interface';
import { Formulae } from './formulae';

export class CharacterFactory {
  public static readonly traits: Trait[] = [
    {
      label: 'sage',
      description: 'A keen mind for both scholarship and statecraft.',
      statModifiers: {
        knowledge: 2,
        administration: 1,
      },
    },

    {
      label: 'courageous',
      description:
        'Not afraid of danger. Martial bonus but may take unnecessary risks.',
      statModifiers: {
        martial: 2,
        knowledge: -1,
      },
    },
    {
      label: 'greedy',
      description:
        'Thinks about money first. Administration bonus but poor reputation.',
      statModifiers: {
        administration: 2,
        charisma: -2,
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
        martial: -1,
        administration: -1,
        dexterity: -1,
      },
    },
    {
      label: 'genius',
      description: 'A brilliant mind. Massive knowledge bonus.',
      statModifiers: {
        knowledge: 4,
      },
    },
    {
      label: 'clumsy',
      description: 'Often makes mistakes. Poor dexterity.',
      statModifiers: {
        dexterity: -3,
      },
    },
    {
      label: 'diligent',
      description: 'Works hard. Balanced bonus on multiple skills.',
      statModifiers: {
        administration: 1,
        dexterity: 1,
        martial: 1,
      },
    },
    {
      label: 'cruel',
      description: 'Uses fear to control. Less charisma, more martial.',
      statModifiers: {
        martial: 2,
        charisma: -2,
      },
    },
    {
      label: 'honest',
      description: 'Trustworthy. Liked but sometimes too blunt.',
      statModifiers: {
        charisma: 1,
        administration: 1,
      },
    },
    {
      label: 'schemer',
      description:
        'Plots behind the scenes. Bonus in knowledge and secret relations.',
      statModifiers: {
        knowledge: 2,
        charisma: 1,
      },
    },
  ];
  public static readonly avatarBasePath = 'assets/avatars/';
  public static readonly maleAvatars = [
    'generic0.jpg',
    'generic1.jpg',
    'generic2.jpg',
    'generic3.jpg',
    'generic4.jpg',
    'generic5.jpg',
    'generic6.jpg',
    'generic7.jpg',
    'generic8.jpg',
    'generic9.jpg',
    'generic10.jpg',
    'generic11.jpg',
    'generic12.jpg',
    'generic13.jpg',
    'generic14.jpg',
    'generic15.jpg',
    'generic16.jpg',
    'generic17.jpg',
    'generic18.jpg',
    'generic19.jpg',
  ];
  public static readonly femaleAvatars = [
    'generic21.jpg',
    'generic22.jpg',
    'generic23.jpg',
    'generic24.jpg',
    'generic25.jpg',
    'generic26.jpg',
    'generic27.jpg',
    'generic28.jpg',
    'generic29.jpg',
    'generic30.jpg',
    'generic31.jpg',
  ];
  public static readonly prefixes = [
    'A',
    'Ao',
    'Ae',
    'An',
    'Ar',
    'At',
    'As',
    'Ba',
    'Bi',
    'Ca',
    'Da',
    'Fa',
    'Ta',
    'Ra',
    'Sa',
    'Ja',
    'Ju',
  ];
  public static readonly suffixes = ['n', 'rne', 'me', 'z', 'eis', 'branth'];

  public static generateCharacter(): Character {
    const name = this.getRandomName();
    const gender: 'Male' | 'Female' = Math.random() > 0.5 ? 'Male' : 'Female';
    const stats: CharacterStats = {
      knowledge: Formulae.getRandomNumber(1, 10),
      charisma: Formulae.getRandomNumber(1, 10),
      dexterity: Formulae.getRandomNumber(1, 10),
      martial: Formulae.getRandomNumber(1, 10),
      administration: Formulae.getRandomNumber(1, 10),
    };

    const avatar = this.getRandomAvatar(gender.toLowerCase());

    return new Character(name, gender, stats, avatar);
  }

  public static getRandomTrait(): Trait {
    return this.traits[(this.traits.length * Math.random()) | 0];
  }

  private static getRandomName(): string {
    return (
      this.prefixes[(this.prefixes.length * Math.random()) | 0] +
      this.suffixes[(this.suffixes.length * Math.random()) | 0]
    );
  }

  private static getRandomAvatar(gender: string): string {
    let randomAvatar;
    gender === 'male'
      ? (randomAvatar =
          this.maleAvatars[(this.maleAvatars.length * Math.random()) | 0])
      : (randomAvatar =
          this.femaleAvatars[(this.femaleAvatars.length * Math.random()) | 0]);
    return this.avatarBasePath + randomAvatar;
  }
}
