import { CivicStat } from '../../../../../enums/faction/civic-stat.enum';
import { Character } from '../../../../../models/character/character.model';
import { EventRule } from '../../../../../types/event/event-rule.interface';
import { Formulae } from '../../../../../utils/formulae.utils';

export const characterEventRules: EventRule<[Character]>[] = [
  {
    name: 'Officer defect',
    level: 'Character',
    applicable: (character: Character) =>
      character.loyalty < 25 && Math.random() * 100 > 75,
    chance: (character: Character) => character.loyalty,
    success: (character: Character) => {
      const loyaltyGain = Formulae.getRandomNumber(1, 10);

      return {
        id: crypto.randomUUID(),
        factionId: character.faction.id,
        characterId: character.id,
        title: `${character.name} stayed loyal`,
        descriptions: [
          `${character.name} considered defecting but stayed.`,
          `${character.name} gains ${loyaltyGain} loyalty`,
        ],
        apply: () => {
          character.loyalty += loyaltyGain;
        },
      };
    },
    failure: (character: Character) => {
      const conscriptLoss = Formulae.getRandomNumber(
        1,
        character.stats.charisma * 10,
      );
      const influenceLoss = Formulae.getRandomNumber(
        1,
        character.stats.charisma,
      );

      {
        return {
          id: crypto.randomUUID(),
          factionId: character.faction.id,
          characterId: character.id,
          title: `${character.name} defects!`,
          descriptions: [
            `${character.name} is unhappy and leaves the faction!`,
            `He deserted with ${conscriptLoss} troops.`,
            `The faction lost ${influenceLoss} influence.`,
          ],
          apply: () => {
            if (character.job) {
              character.job.assigned = null;
              character.job = null;
            }
            const faction = character.faction;
            faction.characters = faction.characters.filter(
              (c) => c.id !== character.id,
            );
            faction.stats[CivicStat.Conscript] -= conscriptLoss;
            faction.stats[CivicStat.Influence] -= influenceLoss;
          },
        };
      }
    },

    weight: 25,
  },
];
