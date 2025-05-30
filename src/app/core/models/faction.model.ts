import { Character } from './character/character.model';
import { City } from './city.model';
import { Fief } from './fief.model';

export class Faction {
  name: string;
  color: string;
  cities: City[];
  fiefs: Fief[];
  atWar: Faction[];
  characters: Character[];
  player: boolean;
  gold: number;
  resource: number;
  unit: number;
  population: number;
  spied: boolean;
  actionCount: number;

  constructor(
    name: string,
    color: string,
    characters: Character[],
    player: boolean
  ) {
    this.name = name;
    this.color = color;
    this.player = player;
    this.characters = characters;

    this.cities = [];
    this.fiefs = [];
    this.gold = 1000;
    this.resource = 1000;
    this.unit = 250;
    this.population = 250;
    this.atWar = [];
    this.spied = false;
    this.actionCount = 3;
  }
}
