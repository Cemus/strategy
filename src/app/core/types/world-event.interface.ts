export interface WorldEvent {
  title: string;
  type:
    | 'relationImproved'
    | 'traitGain'
    | 'statGain'
    | 'disorder'
    | 'factionBonus'
    | 'gold';
  message: string;
  characterId?: string;
  characters?: [string, string];
  cityId?: string;
  factionId?: string;
}
