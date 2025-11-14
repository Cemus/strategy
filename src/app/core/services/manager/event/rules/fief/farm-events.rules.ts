import { CivicStat } from '../../../../../enums/civic-stat.enum';
import { FiefType } from '../../../../../enums/fief-type.enum';
import { Fief } from '../../../../../models/fief/fief.model';
import { EventRule } from '../../../../../types/event-rule.interface';
import { Formulae } from '../../../../../utils/formulae';

export const farmEventRules: EventRule<[Fief]>[] = [
  {
    name: 'Farm Success',
    level: 'Fief',
    applicable: (fief) => !!fief.assigned && fief.type === FiefType.Farm,
    chance: (fief) => fief.assigned!.stats.governance,
    success: (fief) => {
      const resourceGain = Formulae.getRandomNumber(
        1,
        100 - fief.assigned!.stats.governance,
      );

      return {
        id: crypto.randomUUID(),
        factionId: fief.faction.id,
        fiefId: fief.id,
        characterId: fief.assigned!.id,
        title: `${fief.assigned!.name} succeeded at ${fief.type}`,
        descriptions: [`${resourceGain} resource(s) gained!`],
        apply: () => {
          const faction = fief.faction;
          faction.stats[CivicStat.Resource] += resourceGain;
        },
      };
    },
    failure: (fief) => {
      const resourceLoss = Formulae.getRandomNumber(
        1,
        100 - fief.assigned!.stats.governance,
      );

      return {
        id: crypto.randomUUID(),
        factionId: fief.faction.id,
        fiefId: fief.id,
        characterId: fief.assigned!.id,
        title: `${fief.assigned!.name} failed at ${fief.type}`,
        descriptions: [`Lost ${resourceLoss} resource(s).`],
        apply: () => {
          const faction = fief.faction;
          faction.stats[CivicStat.Resource] -= resourceLoss;
        },
      };
    },
    weight: 50,
  },
];
