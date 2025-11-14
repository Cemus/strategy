import { City } from '../models/city/city.model';
import { Faction } from '../models/faction/faction.model';

export class Formulae {
  static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static clamp(value: number, min = 0, max = 100) {
    return Math.max(min, Math.min(max, value));
  }
}

export function calculateRequiredXP(currentLevel: number) {
  const base = 50;
  return base * Math.pow(2, currentLevel);
}

export function getDistanceToClosestCity(
  selectedCity: City,
  playerFaction: Faction,
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
) {
  const queue: [City, number][] = [];
  const visited: Set<string> = new Set();

  queue.push([provinceA, 0]);
  visited.add(provinceA.id);

  while (queue.length > 0) {
    const [currentCity, currentDistance] = queue.shift()!;

    if (currentCity.id === provinceB.id) {
      return currentDistance;
    }

    for (const neighbor of currentCity.neighbors) {
      if (neighbor.id && !visited.has(neighbor.id)) {
        queue.push([neighbor, currentDistance + 1]);
        visited.add(neighbor.id);
      }
    }
  }

  return Infinity;
}
