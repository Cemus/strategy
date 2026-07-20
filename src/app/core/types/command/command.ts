import { CharacterStat } from '../../enums/character/character-stat.enum';
import CommandContext from './command-context';

export interface Command {
  id: string;
  label: string;
  description: string;
  successText: string;
  show: boolean;
  stat: CharacterStat | null;
  requirement: number | null;
  bgColor: string;
  textColor: string;
  context: CommandContext;
}
