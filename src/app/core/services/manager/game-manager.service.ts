import { Injectable } from '@angular/core';
import { CharacterStats } from '../../models/character/character-stats.model';
import { Character } from '../../models/character/character.model';
import { GameStoreService } from '../game-store.service';
import { Trait } from '../../types/trait.interface';
import { generateTurnReport } from '../../utils/turn-report';
import { Fief, FiefUpgrade } from '../../models/fief/fief.model';
import { Faction } from '../../models/faction/faction.model';
import { TurnReport } from '../../types/turn-report.interface';
import { CivicStat } from '../../enums/civic-stat.enum';
import { WorldEvent } from '../../types/world-event.interface';
import { EventManagerService } from './event/event-manager.service';
import { FactionManagerService } from './faction/faction-manager.service';
import { FiefManagerService } from './fief/fief-manager.service';
import { CharacterManagerService } from './character/character-manager.service';
import { ReportManagerService } from './report/report-manager.service';
import { TurnManagerService } from './turn/turn-manager.service';

@Injectable({ providedIn: 'root' })
export default class GameManagerService {
  constructor(
    readonly character: CharacterManagerService,
    readonly fief: FiefManagerService,
    readonly event: EventManagerService,
    readonly report: ReportManagerService,
    readonly turn: TurnManagerService,
  ) {}
}
