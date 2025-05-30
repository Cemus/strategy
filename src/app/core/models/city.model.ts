import { Faction } from './faction.model';
import { Fief } from './fief.model';
import { v4 as uuidv4 } from 'uuid';

export class City {
  id: string;
  name: string;
  owner: Faction;
  neighbors: City[];
  fiefs: Fief[];
  defenseLvl: number;
  pathData: string;

  constructor(name: string, owner: Faction, fiefs: Fief[], pathData: string) {
    this.name = name;
    this.owner = owner;
    this.fiefs = fiefs;
    this.pathData = pathData;

    this.id = uuidv4();
    this.defenseLvl = 0;
    this.neighbors = [];
  }
}
