import { Injectable } from '@angular/core';
import { GameStoreService } from '../../game-store.service';

@Injectable({
  providedIn: 'root',
})
export class FactionManagerService {
  constructor(private readonly store: GameStoreService) {}

  getFactionById(id: string) {
    return this.store.faction.getAll().find((f) => f.id === id);
  }
}
