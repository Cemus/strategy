import { Injectable } from '@angular/core';
import { Character } from '../models/character/character.model';
import { GameStoreService } from './game-store.service';
import { CharacterFactory } from '../utils/character-utils';

export interface WorldEvent {
  type:
    | 'relationImproved'
    | 'traitGain'
    | 'statGain'
    | 'disorder'
    | 'factionBonus';
  message: string;
  characterId?: string;
  characters?: [string, string];
  cityId?: string;
  factionId?: string;
}

@Injectable({ providedIn: 'root' })
export class WorldEventEngine {
  constructor(private readonly gameStore: GameStoreService) {}

  simulateTurn(): WorldEvent[] {
    const events: WorldEvent[] = [];

    events.push(...this.resolveCharacterRelations());

    events.push(...this.citySecurityEvents());

    events.push(...this.randomFactionEvents());

    events.push(...this.characterGrowthEvents());

    return events;
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
            events.push({
              type: 'relationImproved',
              characters: [c1.id, c2.id],
              message: `${c1.name} and ${c2.name} have improved their bond.`,
            });

            this.gameStore.characterImproveRelation(c1.id, c2.id, 5);
          }
        }
      }
    });

    return events;
  }

  private citySecurityEvents(): WorldEvent[] {
    const events: WorldEvent[] = [];

    this.gameStore.getAllCities().forEach((city) => {
      const totalSecurity = city.fiefs.reduce((sum, f) => {
        return sum + (f.getUpgradeEffectsForAction('Patrol')?.Security ?? 0);
      }, city.defenseLvl);

      if (totalSecurity < 5 && Math.random() < 0.2) {
        events.push({
          type: 'disorder',
          cityId: city.id,
          message: `Disorder erupts out in ${city.name} due to a lack of security.`,
        });

        city.defenseLvl = Math.max(0, city.defenseLvl - 1);
      }
    });

    return events;
  }

  private characterGrowthEvents(): WorldEvent[] {
    const events: WorldEvent[] = [];

    this.gameStore.getAllCharacters().forEach((character) => {
      if (Math.random() < 0.15) {
        const statValue = 1;
        this.gameStore.characterGainStat(character.id, 'knowledge', statValue);
        events.push({
          type: 'statGain',
          characterId: character.id,
          message: `${character.name} gain ${statValue} knowledge.`,
        });
      }

      if (Math.random() < 0.1) {
        const newTrait = CharacterFactory.getRandomTrait();
        this.gameStore.characterGainTrait(character.id, newTrait);
        events.push({
          type: 'traitGain',
          characterId: character.id,
          message: `${character.name} has acquired the trait "${newTrait.label}".`,
        });
      }
    });

    return events;
  }

  private randomFactionEvents(): WorldEvent[] {
    const events: WorldEvent[] = [];

    this.gameStore.getAllFactions().forEach((faction) => {
      if (!faction.player && Math.random() < 0.1) {
        faction.gold += 100;
        events.push({
          type: 'factionBonus',
          factionId: faction.name,
          message: `${faction.name} has increased its revenues.`,
        });
      }
    });

    return events;
  }
}
