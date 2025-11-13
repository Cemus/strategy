import { CivicStat } from '../../../../../enums/civic-stat.enum';
import { Character } from '../../../../../models/character/character.model';
import { EventRule } from '../../../../../types/event-rule.interface';

export const characterEventRules: EventRule<[Character]>[] = [
  {
    name: 'Officer defect',
    level: 'Character',
    applicable: (character: Character) =>
      character.stats.loyalty < 30 && Math.random() * 100 > 75,
    chance: (character: Character) => character.stats.loyalty,
    success: (character: Character) => ({
      id: crypto.randomUUID(),
      factionId: character.faction.id,
      characterId: character.id,
      title: `${character.name} stayed loyal`,
      description: `${character.name} considered defecting but stayed.`,
      effects: {},
    }),
    failure: (character: Character) => ({
      id: crypto.randomUUID(),
      factionId: character.faction.id,
      characterId: character.id,
      title: `${character.name} defects!`,
      description: `${character.name} is unhappy and leaves the faction!`,
      effects: {
        [CivicStat.Conscript]: -100,
        [CivicStat.Influence]: -10,
      },
    }),
    onSuccess: (character: Character) => {
      character.stats.loyalty += 10;
    },
    onFailure: (character: Character) => {
      if (character.job) {
        character.job.assigned = null;
        character.job = null;
      }
      const faction = character.faction;
      faction.characters = faction.characters.filter(
        (c) => c.id !== character.id,
      );
    },
    weight: 25,
  },
];
