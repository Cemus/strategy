import { CivicStat } from '../../../../../enums/faction/civic-stat.enum';
import { FiefType } from '../../../../../enums/fief/fief-type.enum';
import { Fief } from '../../../../../models/fief/fief.model';
import { EventRule } from '../../../../../types/event/event-rule.interface';
import { Formulae } from '../../../../../utils/formulae.utils';

export const marketEventRules: EventRule<[Fief]>[] = [
  {
    name: 'Market Success',
    level: 'Fief',
    applicable: (fief) => !!fief.assigned && fief.type === FiefType.Market,

    chance: (fief) => fief.assigned?.stats.charisma ?? 0,

    success: (fief) => {
      const charisma = fief.assigned?.stats.charisma ?? 0;

      const goldGain = Formulae.getRandomNumber(charisma * 2, charisma * 5);

      return {
        id: crypto.randomUUID(),
        factionId: fief.faction.id,
        fiefId: fief.id,
        characterId: fief.assigned?.id,
        title: `${fief.assigned?.name} succeeded at ${fief.type}`,
        descriptions: [`${goldGain} gold gained!`],
        apply: () => {
          const faction = fief.faction;

          faction.stats[CivicStat.Gold] += goldGain;
        },
      };
    },

    failure: (fief) => {
      const charisma = fief.assigned?.stats.charisma ?? 0;

      const goldLoss = Formulae.getRandomNumber(1, Math.max(1, 10 - charisma));

      return {
        id: crypto.randomUUID(),
        factionId: fief.faction.id,
        fiefId: fief.id,
        characterId: fief.assigned?.id,
        title: `${fief.assigned?.name} failed at ${fief.type}`,
        descriptions: [`Lost ${goldLoss} gold.`],
        apply: () => {
          const faction = fief.faction;

          faction.stats[CivicStat.Gold] -= goldLoss;
        },
      };
    },

    weight: 50,
  },
];
