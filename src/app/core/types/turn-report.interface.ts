import { CivicStat } from '../enums/civic-stat.enum';
import { WorldEvent } from './world-event.interface';

export class FactionStatSnapShot {
  private _factionId: string;
  private _stats: Record<CivicStat, number>;

  constructor(factionId: string, stats: Record<CivicStat, number>) {
    this._factionId = factionId;
    this._stats = stats;
  }

  public get factionId(): string {
    return this._factionId;
  }
  public set factionId(value: string) {
    this._factionId = value;
  }
  public get stats(): Record<CivicStat, number> {
    return this._stats;
  }
  public set stats(value: Record<CivicStat, number>) {
    this._stats = value;
  }
}

export interface TurnReport {
  factionsSnapshot: FactionStatSnapShot[];
  worldEvents?: WorldEvent[];
}
