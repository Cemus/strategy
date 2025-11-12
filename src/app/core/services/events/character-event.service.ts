import { Injectable, Injector } from '@angular/core';
import { GameStoreService } from '../game-store.service';
import { Character } from '../../models/character/character.model';
import { WorldEvent } from '../../types/world-event.interface';
import { CharacterFactory } from '../../utils/character-utils';
import GameManager from '../manager/game-manager.service';
import { City } from '../../models/city/city.model';
import { Trait } from '../../types/trait.interface';

@Injectable({ providedIn: 'root' })
export class CharacterEventService {
  public generateEvents(
    cities: City[],
    characters: Character[],
    characterImproveRelation: (id1: string, id2: string, value: number) => void,
    characterGainStat: (
      id: string,
      statName: string,
      statValue: number,
    ) => void,
    characterGainTrait: (id: string, trait: Trait) => void,
  ): WorldEvent[] {
    return [
      ...this.resolveCharacterRelations(cities, characterImproveRelation),
      ...this.characterStatGain(characters, characterGainStat),
      ...this.characterTraitGain(characters, characterGainTrait),
    ];
  }

  private resolveCharacterRelations(
    cities: City[],
    characterImproveRelation: (id1: string, id2: string, value: number) => void,
  ): WorldEvent[] {
    const events: WorldEvent[] = [];

    cities.forEach((city) => {
      const fiefs = city.fiefs;
      const characters = fiefs
        .flatMap((f) => f.assigned)
        .filter(Boolean) as Character[];

      for (let i = 0; i < characters.length; i++) {
        for (let j = i + 1; j < characters.length; j++) {
          const c1 = characters[i];
          const c2 = characters[j];

          if (Math.random() < 0.3) {
            characterImproveRelation(c1.id, c2.id, 5);
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

  private characterStatGain(
    characters: Character[],
    characterGainStat: (
      id: string,
      statName: string,
      statValue: number,
    ) => void,
  ): WorldEvent[] {
    const events: WorldEvent[] = [];

    characters.forEach((character) => {
      if (Math.random() < 0.15) {
        const statValue = 1;
        characterGainStat(character.id, 'knowledge', statValue);
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

  private characterTraitGain(
    characters: Character[],
    characterGainTrait: (id: string, trait: Trait) => void,
  ): WorldEvent[] {
    const events: WorldEvent[] = [];

    characters.forEach((character) => {
      if (Math.random() < 0.1) {
        const newTrait = CharacterFactory.getRandomTrait(character.traits);
        if (newTrait) {
          characterGainTrait(character.id, newTrait);
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
