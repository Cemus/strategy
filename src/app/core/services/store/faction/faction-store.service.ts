import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Faction } from '../../../models/faction/faction.model';

@Injectable({ providedIn: 'root' })
export default class FactionStoreService {
  private factionsSubject = new BehaviorSubject<Faction[]>([]);
  factions$ = this.factionsSubject.asObservable();

  updateAll(factions: Faction[]) {
    this.factionsSubject.next(factions);
  }

  updateSingle(faction: Faction) {
    const factions = this.getAll().filter((f) => f.id !== faction.id);
    this.updateAll([...factions, faction]);
  }

  getFactionById(id: string) {
    return this.getAll().find((f) => f.id === id);
  }

  getAll() {
    return this.factionsSubject.getValue();
  }
}
