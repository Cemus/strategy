export interface TurnReport {
  goldGained: number;
  foodProduced: number;
  charactersStatus: {
    id: string;
    name: string;
    exhausted: boolean;
    newTraits?: string[];
  }[];
  fiefChanges: {
    id: string;
    name: string;
    newLevel?: number;
    destroyed?: boolean;
  }[];
}
