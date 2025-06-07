import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Faction } from '../models/faction.model';
import { Fief, FiefUpgrade } from '../models/fief.model';
import { City } from '../models/city.model';
import { Character } from '../models/character/character.model';
import { TurnReport } from '../types/turn-report.interface';
import { generateTurnReport } from '../utils/turn-report';
import { CharacterStats } from '../models/character/character-stats.model';
import { Trait } from '../types/trait.interface';
import { WorldEventService } from './world-event.service';

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

  private turnSubject = new BehaviorSubject<number>(1);
  turn$ = this.turnSubject.asObservable();

  private turnReport = new BehaviorSubject<TurnReport>({
    goldGained: 0,
    foodProduced: 0,
    charactersStatus: [],
    fiefChanges: [],
  });
  turnReport$ = this.turnReport.asObservable();

  constructor(private readonly worldEventService: WorldEventService) {}

  endTurn() {
    this.turnSubject.next(this.turnSubject.value + 1);

    const turnReport = generateTurnReport();

    const worldEvents = this.worldEventService.generateEvents();
    console.log(worldEvents);
    this.selectedMenuSubject.next('report');
    this.turnReport.next({ ...turnReport, worldEvents });
  }

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

  getAllFactions(): Faction[] {
    return this.factionsSubject.getValue();
  }

  getSelectedFief(): Fief | null {
    return this.selectedFiefSubject.getValue();
  }

  getAllCities(): City[] {
    return this.getAllFactions().flatMap((f) => f.cities || []);
  }

  getAllCharacters(): Character[] {
    return this.getAllFactions().flatMap((f) => f.characters || []);
  }

  assignCharacterToFief(fiefId: string, character: Character | null): void {
    const factions = this.getAllFactions();

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
    const factions = this.getAllFactions();

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
          this.updateFactions(factions);
          this.updateSelectedFief(fief);
          return;
        }
      }
    }
  }
  upgradeFief(fiefId: string, upgrade: FiefUpgrade): void {
    const factions = this.getAllFactions();

    for (const faction of factions) {
      for (const city of faction.cities) {
        const fief = city.fiefs.find((f) => f.id === fiefId);

        if (fief) {
          fief.upgrade(upgrade);
          this.updateFactions(factions);
          this.updateSelectedFief(fief);
        }

        return;
      }
    }
  }

  characterImproveRelation(c1: string, c2: string, value: number) {
    const characters = this.getAllCharacters();
    const character1 = characters.find((c) => c.id == c1);
    const character2 = characters.find((c) => c.id == c2);

    if (character1 && character2) {
      character1.relations[c2] = (character1.relations[c2] ?? 0) + value;
      character2.relations[c1] = (character2.relations[c1] ?? 0) + value;
    }
  }

  characterGainStat(
    characterId: string,
    stat: keyof CharacterStats,
    value: number
  ) {
    const character = this.getAllCharacters().find((c) => c.id == characterId);

    if (character) {
      if (character && stat in character.stats) {
        character.stats[stat] += value;
      }
    }
  }
  characterGainTrait(characterId: string, trait: Trait) {
    const character = this.getAllCharacters().find((c) => c.id == characterId);

    if (character) {
      if (character) {
        character.traits.push(trait);
      }
    }
  }
}
