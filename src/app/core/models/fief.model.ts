import { FiefType } from '../enums/fief-type.enum';
import { Character } from './character/character.model';
import { Faction } from './faction.model';
import { CivicStat } from '../../../../../src/enums/CivicStat';

export type FiefUpgrade = {
  name: string;
  cost: number;
  effect: Partial<Record<CivicStat, number>>;
  bought: boolean;
};

export class Fief {
  type: FiefType;
  currentAction: string | null;
  assigned: (Character | null)[];
  upgrades: FiefUpgrade[];
  owner: Faction;

  constructor(type: FiefType, owner: Faction) {
    this.type = type;
    this.owner = owner;

    this.currentAction = null;
    this.assigned = Array(this.getInitialSlotCount(type)).fill(null);
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

  private getAvailableUpgrades(): FiefUpgrade[] {
    return this.upgrades.filter((upgrade) => {
      upgrade.bought === false;
    });
  }

  private initUpgrades(): FiefUpgrade[] {
    const upgrades: FiefUpgrade[] = [];

    switch (this.type) {
      case FiefType.Farm:
        upgrades.push({
          name: 'Irrigation System',
          cost: 500,
          effect: { [CivicStat.Population]: 5 },
          bought: false,
        });
        break;
    }

    return upgrades;
  }
}
