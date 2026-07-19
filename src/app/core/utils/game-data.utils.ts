import { CivicStat } from '../enums/faction/civic-stat.enum';
import { FiefType } from '../enums/fief/fief-type.enum';
import { Character } from '../models/character/character.model';
import { City } from '../models/city/city.model';
import { Faction } from '../models/faction/faction.model';
import { Fief } from '../models/fief/fief.model';
import { CharacterFactory } from './character.utils';
import loadSVG from './svg.utils';

export async function buildDefaultData() {
  const factions: Faction[] = buildDefaultFactions();
  const characters: Character[] = [];

  const factionCityNames: Record<string, string[]> = {
    Aureth: ['Forkal', 'Estinfelk'],
    Dalnor: ['Valdor', 'Vabranth'],
    Sylvaris: ['Sylveria', 'Cronswald'],
    Kethral: ['Tormouth'],
  };

  factions.forEach((f) => {
    for (let index = 0; index < 3; index++) {
      const character = CharacterFactory.generateCharacter(f);

      f.characters.push(character);
      characters.push(character);
    }
  });

  const { cities, barbarianFactions } = await buildCitiesFromSvg(
    factions,
    factionCityNames,
  );

  factions.push(...barbarianFactions);

  factions.forEach((faction) => {
    const totalPop = faction.cities.reduce(
      (acc, city) => acc + city.stats.population,
      0,
    );

    faction.stats.population += totalPop;
  });

  return {
    cities,
    factions,
    characters,
  };
}

function buildDefaultFactions(): Faction[] {
  return [
    new Faction('Aureth', 'red', [], true, createKingdomStats()),
    new Faction('Dalnor', 'teal', [], false, createKingdomStats()),
    new Faction('Sylvaris', 'lime', [], false, createKingdomStats()),
    new Faction('Kethral', 'purple', [], false, createKingdomStats()),
  ];
}

function buildBarbarianFaction(cityName: string): Faction {
  return new Faction(`${cityName}'s Tribe`, 'yellow', [], false, {
    gold: 500,
    resource: 250,
    population: 5000,
    conscript: 250,
    satisfaction: 40,
    influence: 25,
    security: 25,
  });
}

function createKingdomStats(): Record<CivicStat, number> {
  return {
    gold: 1000,
    resource: 500,
    population: 10000,
    conscript: 500,
    satisfaction: 80,
    influence: 50,
    security: 50,
  };
}

async function buildCitiesFromSvg(
  factions: Faction[],
  factionCityNames: Record<string, string[]>,
): Promise<{
  cities: City[];
  barbarianFactions: Faction[];
}> {
  const svg = await loadSVG('assets/map/map.svg');

  const pathElements = Array.from(
    svg.querySelectorAll('path[data-name]'),
  ) as SVGPathElement[];

  const cities: City[] = [];
  const barbarianFactions: Faction[] = [];

  pathElements.forEach((pathEl) => {
    const name = pathEl.getAttribute('data-name')!;
    const pathData = pathEl.getAttribute('d')!;

    let faction = factions.find((f) =>
      (factionCityNames[f.name] ?? []).includes(name),
    );

    let isCapital = false;

    if (!faction) {
      faction = buildBarbarianFaction(name);
      barbarianFactions.push(faction);
    } else {
      isCapital = factionCityNames[faction.name][0] === name;
    }

    const city = new City(name, faction, [], pathData, createCityStats());

    const fiefs: Fief[] = [
      new Fief(FiefType.Castle, faction, city),
      new Fief(FiefType.Empty, faction, city),
      new Fief(FiefType.Empty, faction, city),
    ];

    city.fiefs.push(...fiefs);

    city.isCapital = isCapital;

    faction.cities.push(city);
    faction.fiefs.push(...fiefs);

    cities.push(city);
  });

  pathElements.forEach((pathEl) => {
    const name = pathEl.getAttribute('data-name')!;
    const neighborNames =
      pathEl.getAttribute('data-neighbors')?.split(',') ?? [];

    const city = cities.find((c) => c.name === name);

    if (!city) return;

    city.neighbors = neighborNames
      .map((n) => cities.find((c) => c.name === n))
      .filter((c): c is City => !!c);
  });

  return {
    cities,
    barbarianFactions,
  };
}

function createCityStats(): Record<CivicStat, number> {
  return {
    gold: 1000,
    resource: 500,
    population: 10000,
    conscript: 500,
    satisfaction: 80,
    influence: 50,
    security: 50,
  };
}
