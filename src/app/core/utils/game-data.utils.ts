import { CivicStat } from '../enums/faction/civic-stat.enum';
import { FiefType } from '../enums/fief/fief-type.enum';
import { Character } from '../models/character/character.model';
import { City } from '../models/city/city.model';
import { Faction } from '../models/faction/faction.model';
import { Fief } from '../models/fief/fief.model';
import { CharacterFactory } from './character.utils';
import loadSVG from './svg.utils';

async function buildCitiesFromSvg(
  factions: Faction[],
  factionCityNames: Record<string, string[]>,
): Promise<City[]> {
  const svg = await loadSVG('assets/map/map.svg');

  const pathElements = Array.from(
    svg.querySelectorAll('path[data-name]'),
  ) as SVGPathElement[];

  const cityCount: Record<string, number> = {
    Aureth: 0,
    Dalnor: 0,
    Sylvaris: 0,
    Kethral: 0,
  };

  const cities: City[] = [];
  const baseCityStat: Record<CivicStat, number> = {
    gold: 1000,
    resource: 500,
    population: 10000,
    conscript: 500,
    satisfaction: 80,
    influence: 50,
    security: 50,
  };

  pathElements.forEach((pathEl) => {
    const name = pathEl.getAttribute('data-name')!;
    const pathData = pathEl.getAttribute('d')!;

    let faction = factions.find((f) =>
      (factionCityNames[f.name] || []).includes(name),
    );

    if (!faction) {
      faction = factions.find((f) => f.name === 'Barbarians')!;
    }

    let isCapital = false;
    if (faction.name !== 'Barbarians') {
      isCapital = factionCityNames[faction.name][0] === name;
    }

    const city = new City(
      name,
      faction,
      [
        new Fief(FiefType.Castle, faction),
        new Fief(FiefType.Empty, faction),
        new Fief(FiefType.Empty, faction),
      ],
      pathData,
      baseCityStat,
    );

    if (isCapital) {
      city.isCapital = true;
    }

    faction.cities.push(city);
    faction.fiefs.push(...city.fiefs);

    cities.push(city);
  });

  pathElements.forEach((pathEl) => {
    const name = pathEl.getAttribute('data-name')!;
    const neighborNames =
      pathEl.getAttribute('data-neighbors')?.split(',') || [];
    const city = cities.find((c) => c.name === name)!;

    if (!city) return;

    const neighbors = neighborNames
      .map((n) => cities.find((c) => c.name === n))
      .filter((c): c is City => !!c);

    city.neighbors = neighbors;
  });

  return cities;
}

function buildFactions(): Faction[] {
  const baseFactionStats = {
    gold: 1000,
    resource: 500,
    population: 10000,
    conscript: 500,
    satisfaction: 80,
    influence: 50,
    security: 50,
  };
  const aureth = new Faction('Aureth', 'red', [], true, baseFactionStats);
  const dralnor = new Faction('Dalnor', 'teal', [], false, baseFactionStats);
  const sylvaris = new Faction('Sylvaris', 'lime', [], false, baseFactionStats);
  const kethral = new Faction('Kethral', 'purple', [], false, baseFactionStats);
  const barbarians = new Faction(
    'Barbarians',
    'yellow',
    [],
    false,
    baseFactionStats,
  );
  return [aureth, dralnor, sylvaris, kethral, barbarians];
}

export async function buildDefaultData() {
  const factions: Faction[] = buildFactions();
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

  const cities = await buildCitiesFromSvg(factions, factionCityNames);

  factions.forEach((faction) => {
    const totalPop: number = faction.cities.reduce(
      (acc, city) => acc + city.stats.population,
      0,
    );
    faction.stats.population += totalPop;
  });

  return { cities, factions, characters };
}
