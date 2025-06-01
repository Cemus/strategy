import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Faction } from '../models/faction.model';
import { Fief } from '../models/fief.model';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root',
})
export class GameStoreService {
  private factionsSubject = new BehaviorSubject<Faction[]>([]);
  factions$ = this.factionsSubject.asObservable();

  private selectedFiefSubject = new BehaviorSubject<Fief | null>(null);
  selectedFief$ = this.selectedFiefSubject.asObservable();

  private selectedCitySubject = new BehaviorSubject<City | null>(null);
  selectedCity$ = this.selectedCitySubject.asObservable();

  updateFactions(factions: Faction[]) {
    this.factionsSubject.next(factions);
  }

  updateSelectedFief(fief: Fief | null) {
    this.selectedFiefSubject.next(fief);
  }

  updateSelectedCity(city: City | null) {
    this.selectedCitySubject.getValue() == city
      ? this.selectedCitySubject.next(null)
      : this.selectedCitySubject.next(city);
  }

  getSelectedCity(): City | null {
    return this.selectedCitySubject.getValue();
  }

  getCurrentFactions(): Faction[] {
    return this.factionsSubject.getValue();
  }

  getCurrentSelectedFief(): Fief | null {
    return this.selectedFiefSubject.getValue();
  }

  getAllCities(): City[] {
    return this.getCurrentFactions().flatMap((f) => f.cities || []);
  }
}
