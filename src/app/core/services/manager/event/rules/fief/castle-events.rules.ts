import { CivicStat } from '../../../../../enums/civic-stat.enum';
import { FiefType } from '../../../../../enums/fief-type.enum';
import { Fief } from '../../../../../models/fief/fief.model';
import { EventRule } from '../../../../../types/event-rule.interface';

export const castleEventRules: EventRule<[Fief]>[] = [
  {
    name: 'Castle Success',
    level: 'Fief',
    applicable: (fief) => !!fief.assigned && fief.type === FiefType.Castle,
    chance: (fief) => fief.assigned!.stats.might,
    success: (fief) => ({
      id: crypto.randomUUID(),
      factionId: fief.faction.id,
      fiefId: fief.id,
      characterId: fief.assigned!.id,
      title: `${fief.assigned!.name} succeeded at ${fief.type}`,
      description: `10 security gained!`,
      effects: { [CivicStat.Security]: 10 },
    }),
    failure: (fief) => ({
      id: crypto.randomUUID(),
      factionId: fief.faction.id,
      fiefId: fief.id,
      characterId: fief.assigned!.id,
      title: `${fief.assigned!.name} failed at ${fief.type}`,
      description: `Lost 10 security.`,
      effects: { [CivicStat.Security]: -10 },
    }),
    weight: 50,
  },
];
