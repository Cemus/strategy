import { Injectable } from '@angular/core';
import { GameStoreService } from '../../store/game-store.service';
import { Character } from '../../../models/character/character.model';
import { Fief, FiefUpgrade } from '../../../models/fief/fief.model';
import { Faction } from '../../../models/faction/faction.model';

@Injectable({
  providedIn: 'root',
})
export class FiefManagerService {
  constructor(private readonly store: GameStoreService) {}

  getFiefById(id: string): Fief | null {
    const factions = this.store.faction.getAll();
    for (const faction of factions) {
      for (const city of faction.cities) {
        const fief = city.fiefs.find((f: Fief) => f.id === id);
        if (fief) {
          return fief;
        }
      }
    }
    return null;
  }

  assignCharacter(fiefId: string, character: Character | null): void {
    const factions = this.store.faction.getAll();

    for (const faction of factions) {
      for (const city of faction.cities) {
        const fief = city.fiefs.find((f: Fief) => f.id === fiefId);

        if (fief) {
          if (character === null && fief.assigned) {
            const previousCharacter = faction.characters.find(
              (c: Character) => c.id === fief.assigned?.id,
            );
            if (previousCharacter) {
              previousCharacter.job = null;
              this.store.character.updateSingle(previousCharacter);
            }
          }

          if (character !== null) {
            if (character.job !== null) {
              const currentFief = this.getFiefById(character.job.id);
              if (currentFief) {
                character.job = null;
                currentFief.assigned = null;
              }
            }
            const previousCharacter = faction.characters.find(
              (c: Character) => c.id === fief.assigned?.id,
            );
            if (previousCharacter) {
              previousCharacter.job = null;
              this.store.character.updateSingle(previousCharacter);
            }
            const newChar = faction.characters.find(
              (c: Character) => c.id === character.id,
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
        const fief = city.fiefs.find((f: Fief) => f.id === fiefId);

        if (fief) {
          if (fief.assigned !== null) {
            const assignedCharacter = faction.characters.find(
              (c: Character) => c.id === fief.assigned?.id,
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
        const fief = city.fiefs.find((f: Fief) => f.id === fiefId);
        if (fief) {
          if (!this.canBuyUpgrade) {
            return;
          }
          faction.stats.gold -= upgrade.cost;
          fief.applyUpgrade(upgrade);
          this.store.faction.updateAll(factions);
          this.store.fief.updateSelectedFief(fief);
          return;
        }
      }
    }
  }

  canBuyUpgrade(faction: Faction, upgrade: FiefUpgrade) {
    return faction.stats.gold < upgrade.cost || upgrade.bought;
  }

  getSelected() {
    return this.store.fief.getSelected();
  }
}
