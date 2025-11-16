import { CivicStat } from '../../../../../enums/faction/civic-stat.enum';
import { FiefType } from '../../../../../enums/fief/fief-type.enum';
import { Fief } from '../../../../../models/fief/fief.model';
import { EventRule } from '../../../../../types/event/event-rule.interface';
import { Formulae } from '../../../../../utils/formulae.utils';

export const castleEventRules: EventRule<[Fief]>[] = [
  {
    name: 'Castle Success',
    level: 'Fief',
    applicable: (fief) => !!fief.assigned && fief.type === FiefType.Castle,
    chance: (fief) => fief.assigned!.stats.might,
    success: (fief) => {
      const securityGain = Formulae.getRandomNumber(
        1,
        100 - fief.assigned!.stats.might,
      );
      return {
        id: crypto.randomUUID(),
        factionId: fief.faction.id,
        fiefId: fief.id,
        characterId: fief.assigned!.id,
        title: `${fief.assigned!.name} succeeded at ${fief.type}`,
        descriptions: [`${securityGain} security gained!`],
        apply: () => {
          const faction = fief.faction;

          faction.stats[CivicStat.Security] += securityGain;
        },
      };
    },
    failure: (fief) => {
      const securityLoss = Formulae.getRandomNumber(
        1,
        100 - fief.assigned!.stats.might,
      );

      return {
        id: crypto.randomUUID(),
        factionId: fief.faction.id,
        fiefId: fief.id,
        characterId: fief.assigned!.id,
        title: `${fief.assigned!.name} failed at ${fief.type}`,
        descriptions: [`Lost ${securityLoss} security.`],
        apply: () => {
          const faction = fief.faction;

          faction.stats[CivicStat.Security] -= securityLoss;
        },
      };
    },
    weight: 50,
  },
];
