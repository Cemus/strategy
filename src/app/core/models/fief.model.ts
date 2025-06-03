import { FiefType } from '../enums/fief-type.enum';
import { Character } from './character/character.model';
import { Faction } from './faction.model';
import { CivicStat } from '../../../../../src/enums/CivicStat';
import { v4 as uuidv4 } from 'uuid';

export type FiefUpgrade = {
  name: string;
  cost: number;
  effect: Partial<Record<CivicStat, number>>;
  bought: boolean;
};

export class Fief {
  id: string;
  type: FiefType;
  currentAction: string | null;
  assigned: Character | null;
  upgrades: FiefUpgrade[];
  owner: Faction;

  constructor(type: FiefType, owner: Faction) {
    this.type = type;
    this.owner = owner;

    this.id = uuidv4();
    this.currentAction = null;
    this.assigned = null;
    this.upgrades = this.initUpgrades();
  }

  private getInitialSlotCount(type: FiefType): number {
    switch (type) {
      case FiefType.Castle:
        return 3;
      default:
        return 1;
    }
  }

  public getAvailableActions(): string[] {
    switch (this.type) {
      case FiefType.Farm:
        return ['Cultivate', 'Irrigate'];
      case FiefType.Castle:
        return ['Train Troops', 'Recruit'];
      case FiefType.Market:
        return ['Trade', 'Tax'];
      default:
        return [];
    }
  }

  private initUpgrades(): FiefUpgrade[] {
    const upgrades: FiefUpgrade[] = [];

    switch (this.type) {
      case FiefType.Empty:
        upgrades.push(
          {
            name: 'Build Farm',
            cost: 500,
            effect: { [CivicStat.Population]: 5 },
            bought: false,
          },
          {
            name: 'Build Castle',
            cost: 500,
            effect: { [CivicStat.Population]: 5 },
            bought: false,
          }
        );
        break;
      case FiefType.Farm:
        upgrades.push({
          name: 'Irrigation System',
          cost: 500,
          effect: { [CivicStat.Population]: 5 },
          bought: false,
        });
        break;
      case FiefType.Castle:
        upgrades.push({
          name: 'Rampart',
          cost: 500,
          effect: { [CivicStat.Security]: 5 },
          bought: false,
        });
        break;
      default:
        break;
    }
    return upgrades;
  }

  public resetFief(): void {
    this.type = FiefType.Empty;
    this.upgrades = this.initUpgrades();
    this.currentAction = null;
    this.assigned = null;
  }
}
