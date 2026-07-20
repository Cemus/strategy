import { characterEventRules } from './character/character-events.rules';
import { castleEventRules } from './fief/castle-events.rules';
import { farmEventRules } from './fief/farm-events.rules';
import { marketEventRules } from './fief/market-events.rules';

export const fiefRules = [
  ...farmEventRules,
  ...castleEventRules,
  ...marketEventRules,
];
export const cityRules = [];
export const cityFiefRules = [];
export const characterRules = [...characterEventRules];
