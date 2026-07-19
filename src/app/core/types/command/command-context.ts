import { Character } from '../../models/character/character.model';
import { City } from '../../models/city/city.model';
import { Faction } from '../../models/faction/faction.model';
import { Fief } from '../../models/fief/fief.model';

export default interface CommandContext {
  characters: Character[];
  fiefs: Fief[];
  factions: Faction[];
  cities: City[];
}
