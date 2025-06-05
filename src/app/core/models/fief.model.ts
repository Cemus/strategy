import { FiefType } from '../enums/fief-type.enum';
import { Character } from './character/character.model';
import { Faction } from './faction.model';
import { CivicStat } from '../../../../../src/enums/CivicStat';
import { v4 as uuidv4 } from 'uuid';

export type FiefUpgrade = {
  name: string;
  cost: number;
  effect?: Partial<Record<CivicStat, number>>;
  actionBoosts?: Record<string, Partial<Record<CivicStat, number>>>;
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
          effect: { [CivicStat.Population]: 2 },
          actionBoosts: {
            Cultivate: { [CivicStat.Population]: 5 },
          },
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

  public build(upgrade: FiefUpgrade) {
    switch (upgrade.name) {
      case 'Build Farm':
        this.type = FiefType.Farm;
        break;
      case 'Build Castle':
        this.type = FiefType.Castle;
        break;
      case 'Build Market':
        this.type = FiefType.Market;
        break;
    }
    this.upgrades = this.initUpgrades();
  }

  public upgrade(upgrade: FiefUpgrade) {
    if (this.owner.gold < upgrade.cost || upgrade.bought) {
      return;
    }

    this.owner.gold -= upgrade.cost;

    if (this.type === FiefType.Empty) {
      this.build(upgrade);
    } else {
      const targetUpgrade = this.upgrades.find((u) => u.name === upgrade.name);
      if (targetUpgrade) {
        targetUpgrade.bought = true;
      }
    }
  }

  public getUpgradeEffectsForAction(
    action: string
  ): Partial<Record<CivicStat, number>> {
    const total: Partial<Record<CivicStat, number>> = {};

    this.upgrades.forEach((upgrade) => {
      if (!upgrade.bought) return;

      if (upgrade.effect) {
        for (const stat in upgrade.effect) {
          total[stat as CivicStat] =
            (total[stat as CivicStat] ?? 0) +
            (upgrade.effect[stat as CivicStat] ?? 0);
        }
      }

      if (upgrade.actionBoosts && upgrade.actionBoosts[action]) {
        for (const stat in upgrade.actionBoosts[action]) {
          total[stat as CivicStat] =
            (total[stat as CivicStat] ?? 0) +
            (upgrade.actionBoosts[action][stat as CivicStat] ?? 0);
        }
      }
    });

    return total;
  }

  public resetFief(): void {
    this.type = FiefType.Empty;
    this.upgrades = this.initUpgrades();
    this.currentAction = null;
    this.assigned = null;
  }
}
