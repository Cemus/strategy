import { CharacterStats } from '../models/character/character-stats.model';
import { Character } from '../models/character/character.model';
import { Formulae } from './formulae';

export class CharacterFactory {
  static generateCharacter(): Character {
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

  private static getRandomName(): string {
    const prefixes = [
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
    const suffixes = ['n', 'rne', 'me', 'z', 'eis', 'branth'];
    return (
      prefixes[Math.floor(Math.random() * prefixes.length)] +
      suffixes[Math.floor(Math.random() * suffixes.length)]
    );
  }

  private static getRandomAvatar(gender: string): string {
    const avatarBasePath = 'src/assets/avatars/';
    const maleAvatars = [
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
    const femaleAvatars = [
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
    let randomAvatar;
    gender === 'male'
      ? (randomAvatar =
          maleAvatars[Math.floor(Math.random() * maleAvatars.length)])
      : (randomAvatar =
          femaleAvatars[Math.floor(Math.random() * femaleAvatars.length)]);
    return avatarBasePath + randomAvatar;
  }
}
