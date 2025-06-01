import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { City } from '../../../../core/models/city.model';
import { Faction } from '../../../../core/models/faction.model';
import { getDistanceToClosestCity } from '../../../../core/utils/formulae';

export interface Command {
  id: string;
  label: string;
  show: boolean;
  stat: string;
  requirement: number | null;
  bgColor: string;
  textColor: string;
}

@Component({
  selector: 'app-build-commands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './build-commands.component.html',
  styleUrls: ['./build-commands.component.css'],
})
export class BuildCommandsComponent implements OnInit, OnChanges {
  @Input() selectedCity?: City;
  @Input() playerFaction?: Faction;
  @Input() cities?: City[];

  commands: Command[] = [];

  ngOnInit(): void {
    this.buildCommands();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['selectedCity'] ||
      changes['playerFaction'] ||
      changes['cities']
    ) {
      this.buildCommands();
    }
  }

  private buildCommands(): void {
    if (!this.selectedCity || !this.playerFaction || !this.cities) return;

    this.commands = [
      {
        id: 'declareWar',
        label: `Declare war with ${this.selectedCity?.owner?.name}`,
        show: this.isCityNeighbor() && !this.isCityAtWar(),
        stat: 'ATK',
        requirement: this.getCommandRequirement('declareWar'),
        bgColor: 'bg-red-700',
        textColor: 'slate-100',
      },
      {
        id: 'battle',
        label: `Attack ${this.selectedCity?.name}!`,
        show: this.isCityNeighbor() && this.isCityAtWar(),
        stat: 'BTL',
        requirement: null,
        bgColor: 'bg-red-700',
        textColor: 'slate-100',
      },
      {
        id: 'spyNetwork',
        label: `Establish a spy network in ${this.selectedCity?.name}`,
        show:
          this.selectedCity?.owner?.name !== this.playerFaction?.name &&
          this.selectedCity?.owner?.spied === false,
        stat: 'SPD',
        requirement: this.getCommandRequirement('spyNetwork'),
        bgColor: 'bg-yellow-700',
        textColor: 'slate-100',
      },
      {
        id: 'fortify',
        label: `Fortify city ${this.selectedCity?.name}`,
        show:
          this.selectedCity?.owner?.name === this.playerFaction?.name &&
          this.selectedCity?.defenseLvl < 3,
        stat: 'DEF',
        requirement: this.getCommandRequirement('fortify'),
        bgColor: 'bg-blue-700',
        textColor: 'slate-100',
      },
      {
        id: 'askTruce',
        label: `Negotiate truce with ${this.selectedCity?.owner?.name}`,
        show: this.isCityAtWar(),
        stat: 'INT',
        requirement: this.getCommandRequirement('askTruce'),
        bgColor: 'bg-emerald-700',
        textColor: 'slate-100',
      },
      {
        id: 'random',
        label: 'Random event',
        show: this.selectedCity?.owner?.name === this.playerFaction?.name,
        stat: '???',
        requirement: null,
        bgColor: 'bg-slate-100',
        textColor: 'black',
      },
    ];
  }

  isCityNeighbor(): boolean {
    if (!this.selectedCity || !this.playerFaction) {
      return false;
    }
    return (
      this.selectedCity &&
      this.playerFaction?.cities.some((ally) =>
        this.selectedCity?.neighbors.some((n) => n.name === ally.name)
      )
    );
  }

  isCityAtWar(): boolean {
    return (
      this.selectedCity?.owner?.atWar.some(
        (f) => f.name === this.playerFaction?.name
      ) ?? false
    );
  }

  getCommandRequirement(stat: string): number {
    const base = 6;
    let req = 0;

    if (!this.selectedCity || !this.playerFaction || !this.cities) return base;

    switch (stat) {
      case 'declareWar':
        return base;

      case 'fortify':
        return base * (this.selectedCity.defenseLvl + 1);

      case 'askTruce': {
        let totalEnemy = 0;
        let totalPlayer = 0;
        this.selectedCity.owner?.cities.forEach((city) =>
          city.fiefs.forEach((f) => {
            if (f.owner === this.selectedCity?.owner) totalEnemy++;
          })
        );
        this.playerFaction.cities.forEach((city) =>
          city.fiefs.forEach((f) => {
            if (f.owner === this.selectedCity?.owner) totalPlayer++;
          })
        );
        req = (totalEnemy - totalPlayer) * 5;
        return req < 1 ? 5 : req;
      }

      case 'spyNetwork':
        req = base;
        if (this.isCityAtWar()) req += 3;
        req += getDistanceToClosestCity(this.selectedCity, this.playerFaction);
        return req;

      default:
        return base;
    }
  }

  statInfoStyle(bgColor: string, textColor: string): string {
    const textClass =
      textColor === 'black'
        ? 'text-black'
        : textColor === 'slate-100'
        ? 'text-slate-100'
        : '';

    return `px-2 ${bgColor} ${textClass} border-solid w-2/6 text-center border-black border-2 font-semibold lg:text-base text-xs`;
  }

  textInfoStyle(): string {
    return `px-2 w-3/4 lg:text-base text-sm`;
  }

  handleEventMenuDisplay(id: string, req: number | null): void {
    console.log(`Display event: ${id} with requirement ${req}`);
  }
}
