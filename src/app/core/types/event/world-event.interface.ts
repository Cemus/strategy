export interface WorldEvent {
  id: string;
  factionId: string;
  fiefId?: string;
  characterId?: string;
  title: string;
  descriptions: string[];
  apply?: () => void;
}
