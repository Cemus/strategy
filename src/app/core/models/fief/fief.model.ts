import { v4 as uuidv4 } from 'uuid';
import { FiefAction } from '../../enums/fief/fief-action.enum';
import { FiefType } from '../../enums/fief/fief-type.enum';
import { Character } from '../character/character.model';
import { Faction } from '../faction/faction.model';
import { CivicStat } from '../../enums/faction/civic-stat.enum';
import { City } from '../city/city.model';

export type FiefUpgrade = {
  name: string;
  cost: number;
  effect?: Partial<Record<CivicStat, number>>;
  actionBoosts?: Partial<
    Record<FiefAction, Partial<Record<CivicStat, number>>>
  >;
  bought: boolean;
};

export class Fief {
  private _id: string;
  private _type: FiefType;
  private _currentAction: FiefAction;
  private _assigned: Character | null;
  private _upgrades: FiefUpgrade[];
  private _faction: Faction;
  private _city: City;

  constructor(type: FiefType, faction: Faction, city: City) {
    this._type = type;
    this._city = city;
    this._faction = faction;

    this._id = uuidv4();
    this._currentAction = this.getAvailableActions()[0];
    this._assigned = null;
    this._upgrades = this.initUpgrades();
  }

  public getEconomicOutput(): Partial<Record<CivicStat, number>> {
    let base: Partial<Record<CivicStat, number>> = {};

    switch (this.type) {
      case FiefType.Farm:
        base = { [CivicStat.Resource]: 25 };
        break;
      case FiefType.Market:
        base = { [CivicStat.Gold]: 10 };
        break;
      case FiefType.Castle:
        base = { [CivicStat.Security]: 1 };
        break;
      default:
        base = {};
    }

    const upgradeEffects = this.getUpgradeEffectsForAction();
    for (const key in upgradeEffects) {
      base[key as keyof Partial<Record<CivicStat, number>>] =
        (base[key as keyof Partial<Record<CivicStat, number>>] ?? 0) +
        (upgradeEffects[key as keyof Partial<Record<CivicStat, number>>] ?? 0);
    }

    return base;
  }

  public getAvailableActions(): FiefAction[] {
    switch (this.type) {
      case FiefType.Farm:
        return [FiefAction.Cultivate, FiefAction.Irrigate];
      case FiefType.Castle:
        return [FiefAction.Recruit, FiefAction.Patrol];
      case FiefType.Market:
        return [FiefAction.Buy, FiefAction.Sell];
      default:
        return [];
    }
  }

  private initUpgrades(): FiefUpgrade[] {
    const upgrades: FiefUpgrade[] = [];
    const baseFarm = {
      name: 'Build Farm',
      cost: 500,
      effect: { [CivicStat.Resource]: 30, [CivicStat.Gold]: -15 },
      actionBoosts: {
        [FiefAction.Cultivate]: { [CivicStat.Resource]: 15 },
      },
      bought: false,
    };
    const baseCastle = {
      name: 'Build Castle',
      cost: 500,
      effect: { [CivicStat.Security]: 5, [CivicStat.Gold]: -25 },
      actionBoosts: {
        [FiefAction.Recruit]: {
          [CivicStat.Population]: -100,
          [CivicStat.Conscript]: 100,
        },
        [FiefAction.Patrol]: { [CivicStat.Security]: 5 },
      },
      bought: false,
    };
    const baseMarket = {
      name: 'Build Market',
      cost: 500,
      effect: { [CivicStat.Influence]: 5, [CivicStat.Gold]: 10 },
      actionBoosts: {
        [FiefAction.Buy]: {
          [CivicStat.Resource]: 50,
          [CivicStat.Gold]: -50,
        },
        [FiefAction.Sell]: {
          [CivicStat.Gold]: 50,
          [CivicStat.Resource]: -50,
        },
      },
      bought: false,
    };

    switch (this.type) {
      case FiefType.Empty:
        upgrades.push(baseFarm, baseCastle, baseMarket);
        break;

      case FiefType.Farm:
        upgrades.push({
          name: 'Irrigation System',
          cost: 500,
          effect: { [CivicStat.Resource]: 10 },
          bought: false,
        });
        break;

      case FiefType.Market:
        upgrades.push({
          name: 'Trading Post',
          cost: 500,
          effect: { [CivicStat.Gold]: 10, [CivicStat.Influence]: 10 },
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

  public applyUpgrade(upgrade: FiefUpgrade) {
    const targetUpgrade = this.upgrades.find((u) => u.name === upgrade.name);
    if (targetUpgrade) {
      targetUpgrade.bought = true;
    }
    if (this.type === FiefType.Empty) {
      this.build(upgrade);
    }
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
    this.currentAction = this.getAvailableActions()[0];
  }

  public getUpgradeEffectsForAction(): Partial<Record<CivicStat, number>> {
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

      if (this.assigned) {
        if (upgrade.actionBoosts && upgrade.actionBoosts[this.currentAction]) {
          const boostsForAction =
            upgrade.actionBoosts?.[
              this.currentAction as keyof typeof FiefAction
            ];
          if (boostsForAction) {
            for (const stat in boostsForAction) {
              total[stat as CivicStat] =
                (total[stat as CivicStat] ?? 0) +
                (boostsForAction[stat as CivicStat] ?? 0);
            }
          }
        }
      }
    });
    return total;
  }

  public resetFief(): void {
    this.type = FiefType.Empty;
    this.upgrades = this.initUpgrades();
    this.currentAction = this.getAvailableActions()[0];
    this.assigned = null;
  }

  get id() {
    return this._id;
  }

  set id(val: string) {
    this._id = val;
  }

  get type() {
    return this._type;
  }

  set type(val: FiefType) {
    this._type = val;
  }

  get currentAction() {
    return this._currentAction;
  }

  set currentAction(val: FiefAction) {
    this._currentAction = val;
  }

  get assigned() {
    return this._assigned;
  }

  set assigned(val: Character | null) {
    this._assigned = val;
  }

  get upgrades() {
    return this._upgrades;
  }

  set upgrades(val: FiefUpgrade[]) {
    this._upgrades = val;
  }

  get faction() {
    return this._faction;
  }

  set faction(val: Faction) {
    this._faction = val;
  }

  get city(): City {
    return this._city;
  }

  set city(city: City) {
    this._city = city;
  }
}
