import { characterEventRules } from './character/character-events.rules';
import { castleEventRules } from './fief/castle-events.rules';
import { farmEventRules } from './fief/farm-events.rules';

export const allRules = [...farmEventRules];
export const fiefRules = [...farmEventRules, ...castleEventRules];
export const cityRules = [];
export const cityFiefRules = [];
export const characterRules = [...characterEventRules];
