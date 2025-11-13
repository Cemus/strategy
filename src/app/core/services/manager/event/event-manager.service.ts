import { effect, Injectable } from '@angular/core';
import { CivicStat } from '../../../enums/civic-stat.enum';
import { Faction } from '../../../models/faction/faction.model';
import { WorldEvent } from '../../../types/world-event.interface';
import { GameStoreService } from '../../game-store.service';
import { FactionManagerService } from '../faction/faction-manager.service';
import { characterRules, cityFiefRules, fiefRules } from './rules/index.rules';
import { EventRule } from '../../../types/event-rule.interface';

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

    this.applyEventEffects(allEvents);

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
    if (roll < rule.chance(...args)) {
      if (rule.onSuccess) {
        rule.onSuccess(...args);
      }
      events.push(rule.success(...args));
    } else {
      if (rule.onFailure) {
        rule.onFailure(...args);
      }
      if (rule.failure) {
        events.push(rule.failure(...args));
      }
    }
  }

  applyEventEffects(events: WorldEvent[]) {
    events.forEach((e) => {
      if (e.effects) {
        Object.entries(e.effects).forEach(([key, value]) => {
          const statName = key as CivicStat;
          if (value !== undefined) {
            const faction = this.faction.getFactionById(e.factionId);
            if (faction) {
              faction.stats[statName] = (faction.stats[statName] ?? 0) + value;
            }
          }
        });
      }
    });
  }
}
