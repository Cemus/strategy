import { CharacterStat } from '../enums/character-stat.enum';
import { Character } from '../models/character/character.model';
import { Faction } from '../models/faction/faction.model';
import { Trait } from '../types/trait.interface';
import { Formulae } from './formulae';

export class CharacterFactory {
  public static readonly traits: Trait[] = [
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

  public static generateCharacter(faction: Faction): Character {
    const name = this.getRandomName();
    const gender: 'Male' | 'Female' = Math.random() > 0.5 ? 'Male' : 'Female';
    const stats = this.generateStats();
    const avatar = this.getRandomAvatar(gender.toLowerCase());
    const traits = this.generateRandomTraits();

    return new Character(name, gender, stats, avatar, traits, faction);
  }

  public static generateStats(): Record<CharacterStat, number> {
    return {
      governance: 50,
      might: 50,
      diplomacy: 50,
      loyalty: 50,
      knowledge: 50,
    };
  }

  public static generateRandomTraits() {
    const traits: Trait[] = [];
    for (let i = 0; i < 3; i++) {
      if (Math.random() < 0.5) {
        const trait = this.getRandomTrait(traits);
        if (trait) {
          traits.push(trait);
        }
      }
    }
    return traits;
  }

  public static getRandomTrait(existingTraits: Trait[]): Trait | null {
    const availableTraits = this.traits.filter(
      (t) => !existingTraits.includes(t),
    );

    if (availableTraits.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * availableTraits.length);
    return availableTraits[randomIndex];
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
