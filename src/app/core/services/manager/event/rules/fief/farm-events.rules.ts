import { CivicStat } from '../../../../../enums/faction/civic-stat.enum';
import { FiefType } from '../../../../../enums/fief/fief-type.enum';
import { Fief } from '../../../../../models/fief/fief.model';
import { EventRule } from '../../../../../types/event/event-rule.interface';
import { Formulae } from '../../../../../utils/formulae.utils';

export const farmEventRules: EventRule<[Fief]>[] = [
  {
    name: 'Farm Success',
    level: 'Fief',
    applicable: (fief) => !!fief.assigned && fief.type === FiefType.Farm,

    chance: (fief) => {
      return (fief.assigned?.stats.leadership ?? 0) * 10;
    },

    success: (fief) => {
      const leadership = fief.assigned!.stats.leadership;

      const resourceGain = Formulae.getRandomNumber(
        leadership * 2,
        leadership * 5,
      );

      return {
        id: crypto.randomUUID(),
        factionId: fief.faction.id,
        fiefId: fief.id,
        characterId: fief.assigned!.id,
        title: `${fief.assigned!.name} succeeded at ${fief.type}`,
        descriptions: [`${resourceGain} resource(s) gained!`],
        apply: () => {
          fief.faction.stats[CivicStat.Resource] += resourceGain;
        },
      };
    },

    failure: (fief) => {
      const leadership = fief.assigned?.stats.leadership ?? 0;
      const resourceLoss = Formulae.getRandomNumber(
        1,
        Math.max(1, 10 - leadership),
      );

      return {
        id: crypto.randomUUID(),
        factionId: fief.faction.id,
        fiefId: fief.id,
        characterId: fief.assigned?.id,
        title: `${fief.assigned?.name} failed at ${fief.type}`,
        descriptions: [`Lost ${resourceLoss} resource(s).`],
        apply: () => {
          fief.faction.stats[CivicStat.Resource] -= resourceLoss;
        },
      };
    },

    weight: 50,
  },
];
