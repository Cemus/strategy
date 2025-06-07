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
    const eventGenerators = [this.citySecurityEvent.bind(this)];

    this.gameStore.getAllCities().forEach((city) => {
      eventGenerators.forEach((genFn) => {
        const event = genFn(city);
        if (event) events.push(event);
      });
    });

    return events;
  }

  private citySecurityEvent(city: City): WorldEvent | null {
    const totalSecurity = city.fiefs.reduce((sum, f) => {
      return sum + (f.getUpgradeEffectsForAction('Patrol')?.Security ?? 0);
    }, city.defenseLvl);

    if (totalSecurity < 5 && Math.random() < 0.2) {
      city.defenseLvl = Math.max(0, city.defenseLvl - 1);

      return {
        type: 'disorder',
        cityId: city.id,
        message: `Disorder erupts out in ${city.name} due to a lack of security.`,
      };
    }

    return null;
  }
}
