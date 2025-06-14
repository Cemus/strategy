import { Injectable, Injector } from '@angular/core';
import { GameStoreService } from '../game-store.service';
import { Character } from '../../models/character/character.model';
import { WorldEvent } from '../../types/world-event.interface';
import { CharacterFactory } from '../../utils/character-utils';

@Injectable({ providedIn: 'root' })
export class CharacterEventService {
  private _gameStore?: GameStoreService;

  constructor(private injector: Injector) {}

  private get gameStore(): GameStoreService {
    if (!this._gameStore) {
      this._gameStore = this.injector.get(GameStoreService);
    }
    return this._gameStore;
  }

  public generateEvents(): WorldEvent[] {
    const characters = this.gameStore.getAllCharacters();

    return [
      ...this.resolveCharacterRelations(),
      ...this.characterStatGain(characters),
      ...this.characterTraitGain(characters),
    ];
  }

  private resolveCharacterRelations(): WorldEvent[] {
    const events: WorldEvent[] = [];

    this.gameStore.getAllCities().forEach((city) => {
      const fiefs = city.fiefs;
      const characters = fiefs
        .flatMap((f) => f.assigned)
        .filter(Boolean) as Character[];

      for (let i = 0; i < characters.length; i++) {
        for (let j = i + 1; j < characters.length; j++) {
          const c1 = characters[i];
          const c2 = characters[j];

          if (Math.random() < 0.3) {
            this.gameStore.characterImproveRelation(c1.id, c2.id, 5);
            if (city.faction.player || city.faction.spied)
              events.push({
                title: `Relationship`,
                type: 'relationImproved',
                characters: [c1.id, c2.id],
                message: `${c1.name} and ${c2.name} have improved their bond.`,
              });
          }
        }
      }
    });

    return events;
  }

  private characterStatGain(characters: Character[]): WorldEvent[] {
    const events: WorldEvent[] = [];

    characters.forEach((character) => {
      if (Math.random() < 0.15) {
        const statValue = 1;
        this.gameStore.characterGainStat(character.id, 'knowledge', statValue);
        if (character.faction.player || character.faction.spied) {
          events.push({
            title: `Stat gain`,
            type: 'statGain',
            characterId: character.id,
            message: `${character.name} gain ${statValue} knowledge.`,
          });
        }
      }
    });

    return events;
  }

  private characterTraitGain(characters: Character[]): WorldEvent[] {
    const events: WorldEvent[] = [];

    characters.forEach((character) => {
      if (Math.random() < 0.1) {
        const newTrait = CharacterFactory.getRandomTrait(character.traits);
        if (newTrait) {
          this.gameStore.characterGainTrait(character.id, newTrait);
          if (character.faction.player || character.faction.spied) {
            events.push({
              title: `New trait`,
              type: 'traitGain',
              characterId: character.id,
              message: `${character.name} has acquired the trait "${newTrait.label}".`,
            });
          }
        }
      }
    });

    return events;
  }
}
