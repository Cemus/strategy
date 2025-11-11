import { Injectable } from '@angular/core';
import { CharacterStats } from '../models/character/character-stats.model';
import { Character } from '../models/character/character.model';
import { GameStoreService } from '../services/game-store.service';
import { Trait } from '../types/trait.interface';
import { generateTurnReport } from '../utils/turn-report';
import { CivicStat } from '../models/faction/civic-stats.model';
import { FiefUpgrade } from '../models/fief/fief.model';
import { Faction } from '../models/faction/faction.model';
import { TurnReport } from '../types/turn-report.interface';

@Injectable({ providedIn: 'root' })
export default class GameManagerService {
  constructor(private readonly store: GameStoreService) {}

  assignCharacterToFief(fiefId: string, character: Character | null): void {
    const factions = this.store.faction.getAll();

    for (const faction of factions) {
      for (const city of faction.cities) {
        const fief = city.fiefs.find((f) => f.id === fiefId);

        if (fief) {
          if (character === null && fief.assigned) {
            const previousCharacter = faction.characters.find(
              (c) => c.id === fief.assigned?.id,
            );
            if (previousCharacter) {
              previousCharacter.job = null;
              this.store.character.updateSingle(previousCharacter);
            }
          }

          if (character !== null) {
            const previousCharacter = faction.characters.find(
              (c) => c.id === fief.assigned?.id,
            );
            if (previousCharacter) {
              previousCharacter.job = null;
              this.store.character.updateSingle(previousCharacter);
            }
            const newChar = faction.characters.find(
              (c) => c.id === character.id,
            );
            if (newChar) {
              newChar.job = fief;
              this.store.character.updateSingle(newChar);
            }
          }

          fief.assigned = character;

          this.store.faction.updateAll(factions);
          this.store.fief.updateSelectedFief(fief);
          return;
        }
      }
    }

    console.warn('Fief not found for assignment');
  }

  destroyFief(fiefId: string): void {
    const factions = this.store.faction.getAll();

    for (const faction of factions) {
      for (const city of faction.cities) {
        const fief = city.fiefs.find((f) => f.id === fiefId);

        if (fief) {
          if (fief.assigned !== null) {
            const assignedCharacter = faction.characters.find(
              (c) => c.id === fief.assigned?.id,
            );
            if (assignedCharacter) assignedCharacter.job = null;
          }
          fief.resetFief();
          this.store.faction.updateAll(factions);
          this.store.fief.updateSelectedFief(fief);
          return;
        }
      }
    }
  }
  upgradeFief(fiefId: string, upgrade: FiefUpgrade): void {
    const factions = this.store.faction.getAll();

    for (const faction of factions) {
      for (const city of faction.cities) {
        const fief = city.fiefs.find((f) => f.id === fiefId);

        if (fief) {
          fief.upgrade(upgrade);
          this.store.faction.updateAll(factions);
          this.store.fief.updateSelectedFief(fief);
        }

        return;
      }
    }
  }

  characterImproveRelation(c1: string, c2: string, value: number) {
    const characters = this.store.character.getAll();
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
    value: number,
  ) {
    const character = this.store.character
      .getAll()
      .find((c) => c.id === characterId);

    if (character) {
      if (character && stat in character.stats) {
        character.stats[stat] += value;
      }
    }
  }
  characterGainTrait(characterId: string, trait: Trait) {
    const character = this.store.character
      .getAll()
      .find((c) => c.id === characterId);

    if (character) {
      if (character) {
        character.traits.push(trait);
      }
    }
  }

  endTurn() {
    const currentFactions = this.store.faction.getAll();

    this.applyTurnEconomy(currentFactions);
    const turnReport = generateTurnReport(currentFactions);

    this.store.turn.changeTurn();
    this.store.vue.update('report');
    this.store.report.addReport({ ...turnReport });
  }

  applyTurnEconomy(factions: Faction[]) {
    factions.forEach((f) => {
      f.applyTurnEconomy();
      this.store.faction.updateSingle(f);
    });
  }

  generateEvents() {}

  getCurrentReport(): TurnReport | null {
    const reports = this.store.report.getAll();
    if (reports.length === 0) return null;
    return reports[reports.length - 1];
  }

  getPreviousReport(): TurnReport | null {
    const reports = this.store.report.getAll();
    if (reports.length < 2) return null;
    return reports[reports.length - 2];
  }

  getReportStat(
    factionId: string,
    stat: keyof CivicStat,
    report: TurnReport | null,
  ): number {
    if (!report) return 0;
    const factionSnap = report.factionsSnapshot.find(
      (f) => f.factionId === factionId,
    );
    return factionSnap?.stats[stat] ?? 0;
  }
}
