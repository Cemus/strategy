import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { City } from '../../../../core/models/city/city.model';
import { Faction } from '../../../../core/models/faction/faction.model';
import { Formulae } from '../../../../core/utils/formulae.utils';
import { CommandComponent } from '../command/command.component';

export interface Command {
  id: string;
  label: string;
  description: string;
  show: boolean;
  stat: string;
  requirement: number | null;
  bgColor: string;
  textColor: string;
}

@Component({
  selector: 'app-build-commands',
  standalone: true,
  imports: [CommonModule, CommandComponent],
  templateUrl: './build-commands.component.html',
  styleUrls: ['./build-commands.component.css'],
})
export class BuildCommandsComponent implements OnInit, OnChanges {
  @Input() selectedCity?: City;
  @Input() playerFaction?: Faction;
  @Input() cities?: City[];

  protected commands: Command[] = [];

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
        label: `Declare war with ${this.selectedCity?.faction?.name}`,
        description:
          'Open hostilities against this faction and unlock battles for its provinces.',
        show:
          this.isCityNeighbor() &&
          !this.isCityAtWar() &&
          !(this.playerFaction.name === this.selectedCity?.faction?.name),
        stat: 'ATK',
        requirement: this.getCommandRequirement('declareWar'),
        bgColor: 'bg-red-700',
        textColor: 'slate-100',
      },
      {
        id: 'battle',
        label: `Attack ${this.selectedCity?.name}!`,
        description: `Launch an assault to seize control ${this.selectedCity?.name}.`,
        show: this.isCityNeighbor() && this.isCityAtWar(),
        stat: 'BTL',
        requirement: null,
        bgColor: 'bg-red-700',
        textColor: 'slate-100',
      },
      {
        id: 'spyNetwork',
        label: `Establish a spy network in ${this.selectedCity?.name}`,
        description:
          'Establish an intelligence network to reveal information and support future operations.',
        show:
          this.selectedCity?.faction?.name !== this.playerFaction?.name &&
          this.selectedCity?.faction?.spied === false &&
          Formulae.getDistanceToClosestCity(
            this.selectedCity,
            this.playerFaction,
          ) !== Infinity,
        stat: 'SPD',
        requirement: this.getCommandRequirement('spyNetwork'),
        bgColor: 'bg-yellow-700',
        textColor: 'slate-100',
      },
      {
        id: 'fortify',
        label: `Fortify ${this.selectedCity?.name}'s defenses`,
        description: `Strengthen the province defenses against future enemy attacks. Current city's fortification level : ${this.selectedCity.stats.security}.`,
        show:
          this.selectedCity?.faction?.name === this.playerFaction?.name &&
          this.playerFaction.stats.security > 3,
        stat: 'DEF',
        requirement: this.getCommandRequirement('fortify'),
        bgColor: 'bg-blue-700',
        textColor: 'slate-100',
      },
      {
        id: 'askTruce',
        label: `Negotiate truce with ${this.selectedCity?.faction?.name}`,
        description: `Send officers to negociate the end of the conflict against the ${this.selectedCity.faction.name} faction.`,
        show: this.isCityAtWar(),
        stat: 'INT',
        requirement: this.getCommandRequirement('askTruce'),
        bgColor: 'bg-emerald-700',
        textColor: 'slate-100',
      },
      {
        id: 'random',
        label: 'Random event',
        description:
          'Trigger a random event that may bring unexpected rewards or setbacks.',
        show: this.selectedCity?.faction?.name === this.playerFaction?.name,
        stat: '???',
        requirement: null,
        bgColor: 'bg-slate-100',
        textColor: 'text-black',
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
        this.selectedCity?.neighbors.some((n) => n.name === ally.name),
      )
    );
  }

  isCityAtWar(): boolean {
    return (
      this.selectedCity?.faction?.atWar.some(
        (f) => f.name === this.playerFaction?.name,
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
        return Math.floor(base / (this.playerFaction.stats.security / 100) + 1);

      case 'askTruce': {
        let totalEnemy = 0;
        let totalPlayer = 0;
        this.selectedCity.faction?.cities.forEach((city) =>
          city.fiefs.forEach((f) => {
            if (f.faction === this.selectedCity?.faction) totalEnemy++;
          }),
        );
        this.playerFaction.cities.forEach((city) =>
          city.fiefs.forEach((f) => {
            if (f.faction === this.selectedCity?.faction) totalPlayer++;
          }),
        );
        req = (totalEnemy - totalPlayer) * 5;
        return req < 1 ? 5 : req;
      }

      case 'spyNetwork':
        req = base;
        if (this.isCityAtWar()) req += 3;
        req += Formulae.getDistanceToClosestCity(
          this.selectedCity,
          this.playerFaction,
        );
        return req;

      default:
        return base;
    }
  }
}
