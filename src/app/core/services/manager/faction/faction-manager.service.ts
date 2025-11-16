import { Injectable } from '@angular/core';
import { GameStoreService } from '../../store/game-store.service';
import { Faction } from '../../../models/faction/faction.model';

@Injectable({
  providedIn: 'root',
})
export class FactionManagerService {
  constructor(private readonly store: GameStoreService) {}

  init(factions: Faction[]) {
    this.store.faction.updateAll(factions);
  }

  getFactionById(id: string) {
    return this.store.faction.getAll().find((f) => f.id === id);
  }
}
