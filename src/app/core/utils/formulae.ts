import { City } from '../models/city.model';
import { Faction } from '../models/faction.model';

export class Formulae {
  static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export function calculateRequiredXP(currentLevel: number) {
  const base = 50;
  return base * Math.pow(2, currentLevel);
}

export function getCityById(id: string, cities: City[]) {
  const cityByName = Object.fromEntries(
    cities.map((city) => [city.name, city])
  );
  return cityByName[id];
}

export function getDistanceToClosestCity(
  selectedCity: City,
  playerFaction: Faction,
  cities: City[]
) {
  const selectedCityName = selectedCity.name;
  if (!selectedCityName || !playerFaction) {
    return Infinity;
  }

  let minDistance = Infinity;

  for (const playerControlledCity of playerFaction.cities) {
    if (playerControlledCity) {
      const distance = calculateDistanceBetweenCities(
        selectedCity,
        playerControlledCity,
        cities
      );
      if (distance < minDistance) {
        minDistance = distance;
      }
    }
  }

  return minDistance;
}

export function calculateDistanceBetweenCities(
  provinceA: City,
  provinceB: City,
  cities: City[]
) {
  const queue: [City, number][] = [];
  const visited: Set<string> = new Set();

  queue.push([provinceA, 0]);
  visited.add(provinceA.name);

  while (queue.length > 0) {
    const [currentCity, currentDistance] = queue.shift()!;

    if (currentCity.id === provinceB.id) {
      return currentDistance;
    }

    for (const neighbor of currentCity.neighbors) {
      const neighborCity = getCityById(neighbor.id, cities);
      if (neighborCity && !visited.has(neighbor.id)) {
        queue.push([neighborCity, currentDistance + 1]);
        visited.add(neighbor.id);
      }
    }
  }

  return Infinity;
}
