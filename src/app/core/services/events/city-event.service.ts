import { Injectable, Injector } from '@angular/core';
import { City } from '../../models/city.model';
import { WorldEvent } from '../../types/world-event.interface';
import { GameStoreService } from '../game-store.service';

@Injectable({ providedIn: 'root' })
export default class CityEventService {
  private _gameStore?: GameStoreService;

  constructor(private injector: Injector) {}

  private get gameStore(): GameStoreService {
    if (!this._gameStore) {
      this._gameStore = this.injector.get(GameStoreService);
    }
    return this._gameStore;
  }

  public generateEvents(): WorldEvent[] {
    const events: WorldEvent[] = [];
    const eventGenerators = [
      this.disorderEvent.bind(this),
      this.goldEvent.bind(this),
    ];

    this.gameStore.getAllCities().forEach((city) => {
      eventGenerators.forEach((genFn) => {
        const event = genFn(city);
        if (event) events.push(event);
      });
    });

    return events;
  }

  private disorderEvent(city: City): WorldEvent | null {
    const totalSecurity = city.fiefs.reduce((sum, f) => {
      return sum + (f.getUpgradeEffectsForAction('Patrol')?.Security ?? 0);
    }, city.defenseLvl);

    if (totalSecurity < 5 && Math.random() < 0.2) {
      city.defenseLvl = Math.max(0, city.defenseLvl - 1);
      if (city.faction.player || city.faction.spied) {
        return {
          title: `Disorder in ${city.name}`,
          type: 'disorder',
          cityId: city.id,
          message: `Acts of vandalism occured in ${city.name} due to a lack of security.`,
        };
      }
    }

    return null;
  }

  private goldEvent(city: City): WorldEvent | null {
    if (Math.random() < 0.2) {
      city.faction.stats.gold += 1000;
      if (city.faction.player || city.faction.spied) {
        return {
          title: `Good news in ${city.name}`,
          type: 'gold',
          cityId: city.id,
          message: `${city.name} produced gold!`,
        };
      }
    }

    return null;
  }
}
