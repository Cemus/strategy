import { Injectable } from '@angular/core';
import { GameStoreService } from '../../store/game-store.service';
import { Faction } from '../../../models/faction/faction.model';

@Injectable({
  providedIn: 'root',
})
export class FactionManagerService {
  public factions$;

  constructor(private readonly store: GameStoreService) {
    this.factions$ = this.store.faction.factions$;
  }

  init(factions: Faction[]) {
    this.store.faction.updateAll(factions);
  }

  decreaserActionCount(id: string): void {
    const faction = this.getFactionById(id);

    if (!faction) return;

    faction.actionCount--;

    this.store.faction.updateSingle(faction);
  }

  getAll() {
    return this.store.faction.getAll();
  }

  getFactionById(id: string) {
    return this.store.faction.getFactionById(id);
  }

  getPlayerFaction() {
    return this.store.faction.getAll().find((f) => f.player === true);
  }

  truce(factionAId: string, factionBId: string) {
    const factionA = this.getFactionById(factionAId);
    const factionB = this.getFactionById(factionBId);

    if (!factionA || !factionB) return;

    factionA.atWar = factionA?.atWar.filter((f) => f.id !== factionBId);
    factionB.atWar = factionB?.atWar.filter((f) => f.id !== factionAId);

    this.store.faction.updateSingle(factionA);
    this.store.faction.updateSingle(factionB);
  }

  war(factionAId: string, factionBId: string) {
    const factionA = this.getFactionById(factionAId);
    const factionB = this.getFactionById(factionBId);

    if (!factionA || !factionB) return;

    if (
      factionA.atWar.some((f) => f.id === factionBId) ||
      factionB.atWar.some((f) => f.id === factionAId)
    )
      return;

    factionA.atWar.push(factionB);
    factionB.atWar.push(factionA);

    this.store.faction.updateSingle(factionA);
    this.store.faction.updateSingle(factionB);
  }

  spyCity(factionId: string, cityId: string) {
    const faction = this.getFactionById(factionId);
    const city = this.store.city.getCityById(cityId);

    if (!faction || !city) return;

    if (faction.spies.some((c) => c.id === cityId)) return;

    faction.spies.push(city);

    this.store.faction.updateSingle(faction);
    this.store.city.updateSingle(city);
  }
}
