import { CivicStat } from '../models/faction/civic-stats.model';
import { WorldEvent } from './world-event.interface';

export class FactionStatSnapShot {
  private _factionId: string;
  private _stats: CivicStat;

  constructor(factionId: string, stats: CivicStat) {
    this._factionId = factionId;
    this._stats = stats;
  }

  public get factionId(): string {
    return this._factionId;
  }
  public set factionId(value: string) {
    this._factionId = value;
  }
  public get stats(): CivicStat {
    return this._stats;
  }
  public set stats(value: CivicStat) {
    this._stats = value;
  }
}

export interface TurnReport {
  factionsSnapshot: FactionStatSnapShot[];
  worldEvents?: WorldEvent[];
}
