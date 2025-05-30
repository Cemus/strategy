import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Faction } from '../models/faction.model';
import { Fief } from '../models/fief.model';

@Injectable({
  providedIn: 'root',
})
export class GameStoreService {
  private factionsSubject = new BehaviorSubject<Faction[]>([]);
  factions$ = this.factionsSubject.asObservable();

  private selectedFiefSubject = new BehaviorSubject<Fief | null>(null);
  selectedFief$ = this.selectedFiefSubject.asObservable();

  updateFactions(factions: Faction[]) {
    this.factionsSubject.next(factions);
  }

  updateSelectedFief(fief: Fief | null) {
    this.selectedFiefSubject.next(fief);
  }

  getCurrentFactions(): Faction[] {
    return this.factionsSubject.getValue();
  }

  getCurrentSelectedFief(): Fief | null {
    return this.selectedFiefSubject.getValue();
  }
}
