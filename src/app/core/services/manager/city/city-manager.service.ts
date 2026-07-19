import { Injectable } from '@angular/core';
import { GameStoreService } from '../../store/game-store.service';
import { City } from '../../../models/city/city.model';
import { CivicStat } from '../../../enums/faction/civic-stat.enum';

@Injectable({
  providedIn: 'root',
})
export class CityManagerService {
  public cities$;

  constructor(private readonly store: GameStoreService) {
    this.cities$ = this.store.city.cities$;
  }

  init(cities: City[]) {
    this.store.city.updateAll(cities);
  }

  getCityById(id: string) {
    return this.store.city.getAll().find((c) => c.id === id);
  }

  getSelected() {
    return this.store.city.getSelected();
  }

  getAll() {
    return this.store.city.getAll();
  }

  updateSelected(city: City) {
    this.store.city.updateSelected(city);
  }

  updateStat(cityId: string, stat: Partial<Record<CivicStat, number>>) {
    const city = this.getCityById(cityId);

    if (!city) return;

    for (const key in stat) {
      const civicStat = key as CivicStat;

      city.stats[civicStat] = Math.max(
        city.stats[civicStat] + (stat[civicStat] ?? 0),
        100,
      );
    }
  }
}
