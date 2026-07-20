import {
  avatarBasePath,
  femaleAvatars,
  maleAvatars,
} from '../data/character/avatars.data';
import { prefixes, suffixes } from '../data/character/names.data';
import { traits } from '../data/character/traits.data';
import { CharacterStat } from '../enums/character/character-stat.enum';
import { Character } from '../models/character/character.model';
import { Faction } from '../models/faction/faction.model';
import { Trait } from '../types/character/trait.interface';

export class CharacterFactory {
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
      might: Math.floor(Math.random() * (5 - 1) + 1),
      endurance: Math.floor(Math.random() * (5 - 1) + 1),
      agility: Math.floor(Math.random() * (5 - 1) + 1),
      charisma: Math.floor(Math.random() * (5 - 1) + 1),
      intelligence: Math.floor(Math.random() * (5 - 1) + 1),
      leadership: Math.floor(Math.random() * (5 - 1) + 1),
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
    const availableTraits = traits.filter((t) => !existingTraits.includes(t));

    if (availableTraits.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * availableTraits.length);
    return availableTraits[randomIndex];
  }

  private static getRandomName(): string {
    return (
      prefixes[(prefixes.length * Math.random()) | 0] +
      suffixes[(suffixes.length * Math.random()) | 0]
    );
  }

  private static getRandomAvatar(gender: string): string {
    let randomAvatar;
    gender === 'male'
      ? (randomAvatar = maleAvatars[(maleAvatars.length * Math.random()) | 0])
      : (randomAvatar =
          femaleAvatars[(femaleAvatars.length * Math.random()) | 0]);
    return avatarBasePath + randomAvatar;
  }
}
