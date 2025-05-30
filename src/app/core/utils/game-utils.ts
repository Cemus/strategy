import { FiefType } from '../enums/fief-type.enum';
import { City } from '../models/city.model';
import { Faction } from '../models/faction.model';
import { Fief } from '../models/fief.model';
import { CharacterFactory } from './character-utils';

export function buildDefaultData() {
  const valdor = new Faction(
    'Valdor',
    'red',
    [
      CharacterFactory.generateCharacter(),
      CharacterFactory.generateCharacter(),
      CharacterFactory.generateCharacter(),
      CharacterFactory.generateCharacter(),
    ],
    true
  );

  const sylveria = new Faction(
    'Sylveria',
    'green',
    [
      CharacterFactory.generateCharacter(),
      CharacterFactory.generateCharacter(),
      CharacterFactory.generateCharacter(),
      CharacterFactory.generateCharacter(),
    ],
    false
  );

  const vabranth = new Faction(
    'Vabranth',
    'purple',
    [
      CharacterFactory.generateCharacter(),
      CharacterFactory.generateCharacter(),
      CharacterFactory.generateCharacter(),
      CharacterFactory.generateCharacter(),
    ],
    false
  );

  const isdeilis = new Faction(
    'Isdeilis',
    'yellow',
    [
      CharacterFactory.generateCharacter(),
      CharacterFactory.generateCharacter(),
      CharacterFactory.generateCharacter(),
      CharacterFactory.generateCharacter(),
    ],
    false
  );

  const podansk = new City(
    'Podansk',
    valdor,
    [new Fief(FiefType.Castle, valdor)],
    'm 139.63703,70.180268 12.48051,5.426308 -3.07491,10.309989 10.67174,5.426308 16.64068,1.447017 8.86298,-10.30999 h 6.69244 l 2.3514,-8.501216 -8.13946,-5.607187 1.80877,-10.12911 -16.45981,-4.521925 -9.94823,3.255785 -5.96894,4.160171 -4.16017,4.702802 -7.0542,3.436662 z'
  );
  const gersweg = new City(
    'Gersweg',
    sylveria,
    [new Fief(FiefType.Castle, sylveria)],
    'm 148.10743,20.463894 -21.99868,21.998685 4.34857,11.76674 c 3.61244,15.914927 2.38745,10.061415 3.58118,15.092122 0,0 11.76675,2.813786 18.67331,-5.371772 6.90656,-8.185557 18.4175,-10.487747 18.4175,-10.487747 l 4.09278,-5.627571 5.37177,-12.789932 c 0,0 9.72035,5.115973 1.279,-3.581183 -8.44136,-8.697154 -17.90591,-11.766738 -17.90591,-11.766738 z'
  );
  const jarch = new City(
    'Jarch',
    sylveria,
    [new Fief(FiefType.Castle, sylveria)],
    'm 81.756394,72.712545 5.064554,4.16017 3.436662,6.873325 0.723509,4.883679 10.852621,5.426308 6.33069,2.170525 3.9793,-3.436662 8.86297,2.170522 12.48051,-8.320341 15.37454,-0.723506 3.61754,-10.129112 -12.66139,-5.607185 -5.06455,-0.723509 -1.26614,-0.542631 -9.22473,2.170523 -14.83191,2.532279 -13.204018,1.627891 h -4.521925 z'
  );
  const falanth = new City(
    'Falanth',
    isdeilis,
    [new Fief(FiefType.Castle, isdeilis)],
    'm 78.785992,55.252513 7.929758,9.976149 -5.883368,6.650765 11.25514,3.581181 c 0,0 27.303558,-1.493426 41.587018,-6.723481 -2.01663,-10.514469 -3.13772,-14.87128 -7.60329,-26.231037 h -23.69488 l -9.405603,7.415956 -8.320341,1.989647 z'
  );
  const hulme = new City(
    'Hulme',
    vabranth,
    [new Fief(FiefType.Castle, vabranth)],
    'm 102.83107,42.20678 -6.906566,-2.557986 -20.208097,0.767397 -16.882713,6.906564 -12.789932,16.115316 -2.557986,4.604377 -2.046391,7.41816 c 0,0 3.58118,11.510941 6.650765,11.76674 3.069585,0.255799 19.4407,8.697156 19.4407,8.697156 l 11.76674,-6.650768 c 0,0 14.068925,4.860176 10.999343,-4.860173 -3.069585,-9.72035 -8.697156,-11.766741 -8.697156,-11.766741 l 5.477727,-7.087441 -8.366435,-10.175204 6.469888,-3.457047 8.441357,-2.302188 z'
  );
  const yursco = new City(
    'Yursco',
    vabranth,
    [new Fief(FiefType.Castle, vabranth)],
    'm 181.23873,35.451888 3.79842,1.266137 6.87332,2.894034 9.76736,-6.511573 4.7028,11.214372 -2.53228,10.490867 -10.85261,6.873324 -4.70281,-3.436662 -16.82156,-4.521925 3.79842,-5.607187 4.34105,-10.309987 z'
  );

  gersweg.neighbors.push(podansk, yursco, jarch, falanth);
  falanth.neighbors.push(gersweg, jarch, hulme);
  hulme.neighbors.push(falanth, jarch);
  jarch.neighbors.push(podansk, hulme, gersweg, falanth);
  podansk.neighbors.push(gersweg, yursco, jarch);
  yursco.neighbors.push(gersweg, podansk);

  valdor.cities.push(podansk);
  sylveria.cities.push(gersweg, jarch);
  isdeilis.cities.push(falanth);
  vabranth.cities.push(hulme, yursco);

  valdor.fiefs.push(...podansk.fiefs);
  sylveria.fiefs.push(...gersweg.fiefs, ...jarch.fiefs);
  isdeilis.fiefs.push(...falanth.fiefs);
  vabranth.fiefs.push(...hulme.fiefs, ...yursco.fiefs);

  const cities = [podansk, gersweg, jarch, falanth, hulme, yursco];
  const factions = [valdor, sylveria, vabranth, isdeilis];

  return { cities, factions };
}
