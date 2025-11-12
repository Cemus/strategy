import { Injectable } from '@angular/core';
import { CivicStat } from '../../../enums/civic-stat.enum';
import { Faction } from '../../../models/faction/faction.model';
import { WorldEvent } from '../../../types/world-event.interface';
import { GameStoreService } from '../../game-store.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class EventManagerService {
  constructor(private readonly store: GameStoreService) {}

  generateEvents(factions: Faction[]): WorldEvent[] {
    const events: WorldEvent[] = [];

    factions.forEach((faction) => {
      faction.cities.forEach((city) => {
        city.fiefs.forEach((fief) => {
          const char = fief.assigned;
          if (!char) return;

          const roll = Math.random() * 100;
          const competence = char.stats.diplomacy + char.stats.governance;
          const successChance = competence / 2;

          if (roll < successChance) {
            const effect = { [CivicStat.Resource]: 10 };
            events.push({
              id: uuidv4(),
              factionId: faction.id,
              fiefId: fief.id,
              characterId: char.id,
              title: `${char.name} succeeded at ${city.name}'s ${fief.type.toLowerCase()}`,
              description: `The work of ${char.name} paid off. 10 resources gained!`,
              effects: effect,
            });

            Object.entries(effect).forEach(([key, value]) => {
              const statName = key as CivicStat;
              if (value !== undefined) {
                faction.stats[statName] =
                  (faction.stats[statName] ?? 0) + value;
              }
            });
          } else if (roll > 90) {
            events.push({
              id: uuidv4(),
              factionId: faction.id,
              fiefId: fief.id,
              characterId: char.id,
              title: `${char.name} failed at ${city.name}'s ${fief.type.toLowerCase()}`,
              description: `${char.name} messed up at the ${fief.type.toLowerCase()}, lost 10 Gold.`,
              effects: { [CivicStat.Gold]: -10 },
            });
            faction.stats[CivicStat.Gold] -= 10;
          }
          this.store.fief.updateSingle(fief);
        });
        this.store.city.updateSingle(city);
      });
      this.store.faction.updateSingle(faction);
    });
    return events;
  }
}
