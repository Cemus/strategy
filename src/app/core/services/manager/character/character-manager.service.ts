import { Injectable } from '@angular/core';
import { GameStoreService } from '../../store/game-store.service';
import { CharacterStat } from '../../../enums/character/character-stat.enum';
import { Trait } from '../../../types/character/trait.interface';
import { Character } from '../../../models/character/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterManagerService {
  constructor(private readonly store: GameStoreService) {}

  init(characters: Character[]) {
    this.store.character.updateAll(characters);
  }

  improveRelation(c1: string, c2: string, value: number) {
    const characters = this.store.character.getAll();
    const character1 = characters.find((c) => c.id == c1);
    const character2 = characters.find((c) => c.id == c2);

    if (character1 && character2) {
      character1.relations[c2] = (character1.relations[c2] ?? 0) + value;
      character2.relations[c1] = (character2.relations[c1] ?? 0) + value;
    }
  }

  gainStat(characterId: string, stat: keyof CharacterStat, value: number) {
    const character = this.store.character
      .getAll()
      .find((c) => c.id === characterId);

    if (character) {
      if (character && stat in character.stats) {
        character.stats[stat as CharacterStat] += value;
      }
    }
  }

  gainTrait(characterId: string, trait: Trait) {
    const character = this.store.character
      .getAll()
      .find((c) => c.id === characterId);

    if (character) {
      if (character) {
        character.traits.push(trait);
      }
    }
  }

  getCharacterById(id: string) {
    return this.store.character.getAll().find((f) => f.id === id);
  }

  exhaust(id: string): Character | null {
    const character = this.getCharacterById(id);

    if (!character) return null;

    character.exhausted = true;
    return character;
  }

  unexhaustAll() {
    this.store.character.getAll().forEach((c) => (c.exhausted = false));
  }
}
