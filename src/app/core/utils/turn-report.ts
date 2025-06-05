import { TurnReport } from '../types/turn-report.interface';

export function generateTurnReport(): TurnReport {
  return {
    goldGained: 4,
    foodProduced: 1,
    charactersStatus: [
      {
        id: 'abc123',
        name: 'Zhao Yun',
        exhausted: true,
        newTraits: ['Strategist', 'Wounded'],
      },
    ],
    fiefChanges: [
      {
        id: 'fief-001',
        name: "Chang'an",
        newLevel: 2,
        destroyed: false,
      },
    ],
  };
}
