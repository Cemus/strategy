import { Injectable } from '@angular/core';
import { GameStoreService } from '../../game-store.service';
import { getCityById } from '../../../utils/formulae';

@Injectable({
  providedIn: 'root',
})
export class CityManagerService {
  constructor(private readonly store: GameStoreService) {}

  getCityById(id: string) {
    return this.store.city.getAll().find((c) => c.id === id);
  }
}
