import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Faction } from '../models/faction.model';
import { Fief } from '../models/fief.model';
import { City } from '../models/city.model';
import { Character } from '../models/character/character.model';

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

  private selectedMenuSubject = new BehaviorSubject<string>('map');
  selectedMenu$ = this.selectedMenuSubject.asObservable();

  private zoomScaleSubject = new BehaviorSubject<number>(5);
  zoomScale$ = this.zoomScaleSubject.asObservable();

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

  updateSelectedMenu(menu: string) {
    this.selectedMenuSubject.next(menu);
  }

  updateZoomScale(value: number) {
    this.zoomScaleSubject.next(value);
  }

  getZoomScale(): number {
    return this.zoomScaleSubject.getValue();
  }

  getSelectedMenu(): string {
    return this.selectedMenuSubject.getValue();
  }

  getSelectedCity(): City | null {
    return this.selectedCitySubject.getValue();
  }

  getCurrentFactions(): Faction[] {
    return this.factionsSubject.getValue();
  }

  getSelectedFief(): Fief | null {
    return this.selectedFiefSubject.getValue();
  }

  getAllCities(): City[] {
    return this.getCurrentFactions().flatMap((f) => f.cities || []);
  }

  assignCharacterToFief(fiefId: string, character: Character | null): void {
    const factions = this.getCurrentFactions();

    for (const faction of factions) {
      for (const city of faction.cities) {
        const fief = city.fiefs.find((f) => f.id === fiefId);

        if (fief) {
          if (character === null && fief.assigned) {
            fief.currentAction = null;

            const previous = faction.characters.find(
              (c) => c.id === fief.assigned?.id
            );
            if (previous) previous.job = null;
          }

          if (character !== null) {
            const previous = faction.characters.find(
              (c) => c.id === fief.assigned?.id
            );
            if (previous) previous.job = null;

            const newChar = faction.characters.find(
              (c) => c.id === character.id
            );
            if (newChar) {
              newChar.job = fief;
            }
          }

          fief.assigned = character;

          this.updateFactions(factions);
          this.updateSelectedFief(fief);
          return;
        }
      }
    }

    console.warn('Fief not found for assignment');
  }

  destroyFief(fiefId: string): void {
    const factions = this.getCurrentFactions();

    for (const faction of factions) {
      for (const city of faction.cities) {
        const fief = city.fiefs.find((f) => f.id === fiefId);

        if (fief) {
          if (fief.assigned !== null) {
            const assignedCharacter = faction.characters.find(
              (c) => c.id === fief.assigned?.id
            );
            if (assignedCharacter) assignedCharacter.job = null;
          }
          fief.resetFief();
          console.log(fief);
          this.updateFactions(factions);
          this.updateSelectedFief(fief);
          return;
        }
      }
    }
  }
}
