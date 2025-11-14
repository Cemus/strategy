import { Injectable } from '@angular/core';
import { EventManagerService } from './event/event-manager.service';
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
