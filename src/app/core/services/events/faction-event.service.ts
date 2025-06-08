import { Injectable, Injector } from '@angular/core';
import { WorldEvent } from '../../types/world-event.interface';
import { GameStoreService } from '../game-store.service';
import { Faction } from '../../models/faction.model';

@Injectable({ providedIn: 'root' })
export default class FactionEventService {
  private _gameStore?: GameStoreService;

  constructor(private injector: Injector) {}

  private get gameStore(): GameStoreService {
    if (!this._gameStore) {
      this._gameStore = this.injector.get(GameStoreService);
    }
    return this._gameStore;
  }

  public generateEvents(): WorldEvent[] {
    const factions = this.gameStore.getAllFactions();
    return [...this.randomFactionEvents(factions)];
  }

  private randomFactionEvents(factions: Faction[]): WorldEvent[] {
    const events: WorldEvent[] = [];

    factions.forEach((faction) => {
      if (!faction.player && Math.random() < 0.1) {
        faction.gold += 100;
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
