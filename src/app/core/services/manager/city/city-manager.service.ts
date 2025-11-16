import { Injectable } from '@angular/core';
import { GameStoreService } from '../../store/game-store.service';
import { City } from '../../../models/city/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityManagerService {
  constructor(private readonly store: GameStoreService) {}

  init(cities: City[]) {
    this.store.city.updateAll(cities);
  }

  getCityById(id: string) {
    return this.store.city.getAll().find((c) => c.id === id);
  }
}
