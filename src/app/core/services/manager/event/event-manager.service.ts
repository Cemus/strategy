import { Injectable } from '@angular/core';
import { Faction } from '../../../models/faction/faction.model';
import { WorldEvent } from '../../../types/event/world-event.interface';
import { GameStoreService } from '../../store/game-store.service';
import { FactionManagerService } from '../faction/faction-manager.service';
import { characterRules, cityFiefRules, fiefRules } from './rules/index.rules';
import { EventRule } from '../../../types/event/event-rule.interface';

@Injectable({
  providedIn: 'root',
})
export class EventManagerService {
  constructor(
    private readonly store: GameStoreService,
    private readonly faction: FactionManagerService,
  ) {}

  generateEvents(factions: Faction[]): WorldEvent[] {
    const allEvents: WorldEvent[] = [];

    factions.forEach((faction) => {
      faction.characters.forEach((character) => {
        characterRules.forEach((rule) =>
          this.tryApplyRule(rule, allEvents, character),
        );
        this.store.character.updateSingle(character);
      });
      faction.cities.forEach((city) => {
        city.fiefs.forEach((fief) => {
          fiefRules.forEach((rule) => this.tryApplyRule(rule, allEvents, fief));

          cityFiefRules.forEach((rule) =>
            this.tryApplyRule(rule, allEvents, fief, city),
          );

          this.store.fief.updateSingle(fief);
        });
        this.store.city.updateSingle(city);
      });
      this.store.faction.updateSingle(faction);
    });

    const playerFactionId = factions.find((f) => f.player === true)?.id;
    const playerFactionEvents = allEvents.filter(
      (e) => e.factionId === playerFactionId,
    );
    return playerFactionEvents;
  }

  tryApplyRule<Args extends any[]>(
    rule: EventRule<Args>,
    events: WorldEvent[],
    ...args: Args
  ) {
    if (!rule.applicable?.(...args)) return;
    if (rule.weight) {
      if (Math.random() * 100 > rule.weight) {
        return;
      }
    }
    const roll = Math.random() * 100;
    const event =
      roll < rule.chance(...args)
        ? rule.success(...args)
        : rule.failure?.(...args);

    if (event) {
      if (event.apply) {
        event.apply();
      }
      events.push(event);
    }
  }
}
