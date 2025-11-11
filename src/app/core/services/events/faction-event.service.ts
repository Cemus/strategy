import { Injectable, Injector } from '@angular/core';
import { WorldEvent } from '../../types/world-event.interface';
import { GameStoreService } from '../game-store.service';
import { Faction } from '../../models/faction/faction.model';

@Injectable({ providedIn: 'root' })
export default class FactionEventService {
  public generateEvents(factions: Faction[]): WorldEvent[] {
    return [...this.randomFactionEvents(factions)];
  }

  private randomFactionEvents(factions: Faction[]): WorldEvent[] {
    const events: WorldEvent[] = [];

    factions.forEach((faction) => {
      if (!faction.player && Math.random() < 0.1) {
        faction.stats.gold += 100;
        if (faction.player || faction.spied) {
          events.push({
            title: `Prosperity of ${faction.name}`,
            type: 'factionBonus',
            factionId: faction.name,
            message: `${faction.name} has increased its revenues.`,
          });
        }
      }
    });

    return events;
  }
}
