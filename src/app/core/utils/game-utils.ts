import { FiefType } from '../enums/fief-type.enum';
import { Character } from '../models/character/character.model';
import { City } from '../models/city/city.model';
import { Faction } from '../models/faction/faction.model';
import { Fief } from '../models/fief/fief.model';
import { CharacterFactory } from './character-utils';

async function loadMapSvg(): Promise<string> {
  const response = await fetch('assets/map/map.svg');
  if (!response.ok) throw new Error('ERROR: Cannot load the SVG...');
  return await response.text();
}

async function buildCitiesFromSvg(
  factions: Faction[],
  factionCityNames: Record<string, string[]>,
): Promise<City[]> {
  const svgText = await loadMapSvg();
  const parser = new DOMParser();
  const mapSvg = parser.parseFromString(svgText, 'image/svg+xml');

  const pathElements = Array.from(
    mapSvg.querySelectorAll('path[data-name]'),
  ) as SVGPathElement[];

  const cities: City[] = [];

  pathElements.forEach((pathEl) => {
    const name = pathEl.getAttribute('data-name')!;
    const pathData = pathEl.getAttribute('d')!;

    let faction = factions.find((f) =>
      (factionCityNames[f.name] || []).includes(name),
    );

    if (!faction) {
      faction = factions.find((f) => f.name === 'Barbarians')!;
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
    );

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
  const aureth = new Faction('Aureth', 'red', [], true);
  const dralnor = new Faction('Dalnor', 'aqua', [], false);
  const sylvaris = new Faction('Sylvaris', 'purple', [], false);
  const kethral = new Faction('Kethral', 'Teal', [], false);
  const barbarians = new Faction('Barbarians', 'yellow', [], false);
  return [aureth, dralnor, sylvaris, kethral, barbarians];
}

export async function buildDefaultData() {
  const factions: Faction[] = buildFactions();
  const characters: Character[] = [];

  const factionCityNames: Record<string, string[]> = {
    Aureth: ['Forkal'],
    Dalnor: ['Estinfelk', 'Podansk'],
    Sylvaris: ['Sylveria'],
    Kethral: ['Sahram'],
  };

  factions.forEach((f) => {
    for (let index = 0; index < 3; index++) {
      const character = CharacterFactory.generateCharacter(f);
      f.characters.push(character);
      characters.push(character);
    }
  });

  const cities = await buildCitiesFromSvg(factions, factionCityNames);

  return { cities, factions, characters };
}
