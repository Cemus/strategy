import { Injectable } from '@angular/core';
import { CharacterStats } from '../../../models/character/character-stats.model';
import { Trait } from '../../../types/trait.interface';
import { GameStoreService } from '../../game-store.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterManagerService {
  constructor(private readonly store: GameStoreService) {}

  characterImproveRelation(c1: string, c2: string, value: number) {
    const characters = this.store.character.getAll();
    const character1 = characters.find((c) => c.id == c1);
    const character2 = characters.find((c) => c.id == c2);

    if (character1 && character2) {
      character1.relations[c2] = (character1.relations[c2] ?? 0) + value;
      character2.relations[c1] = (character2.relations[c1] ?? 0) + value;
    }
  }

  characterGainStat(
    characterId: string,
    stat: keyof CharacterStats,
    value: number,
  ) {
    const character = this.store.character
      .getAll()
      .find((c) => c.id === characterId);

    if (character) {
      if (character && stat in character.stats) {
        character.stats[stat] += value;
      }
    }
  }

  characterGainTrait(characterId: string, trait: Trait) {
    const character = this.store.character
      .getAll()
      .find((c) => c.id === characterId);

    if (character) {
      if (character) {
        character.traits.push(trait);
      }
    }
  }
}
