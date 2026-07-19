import CommandContext from './command-context';

export interface Command {
  id: string;
  label: string;
  description: string;
  successText: string;
  show: boolean;
  stat: string;
  requirement: number | null;
  bgColor: string;
  textColor: string;
  context: CommandContext;
}
