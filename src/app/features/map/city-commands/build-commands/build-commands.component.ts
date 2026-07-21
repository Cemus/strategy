import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { City } from '../../../../core/models/city/city.model';
import { Faction } from '../../../../core/models/faction/faction.model';
import { Formulae } from '../../../../core/utils/formulae.utils';
import { CommandComponent } from '../command/command.component';
import { Command } from '../../../../core/types/command/command';
import { CharacterStat } from '../../../../core/enums/character/character-stat.enum';

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
        successText: `declared our intention to go in war against ${this.selectedCity?.faction?.name}. Your armies can now march against their provinces.`,
        show:
          this.isCityNeighbor() &&
          !this.isFactionAtWar() &&
          this.playerFaction.name !== this.selectedCity?.faction?.name,
        stat: CharacterStat.Charisma,
        requirement: this.getCommandRequirement('declareWar'),
        bgColor: 'bg-emerald-700',
        textColor: 'slate-100',
        context: {
          characters: [],
          fiefs: [],
          factions: [this.playerFaction, this.selectedCity?.faction],
          cities: [],
        },
      },
      {
        id: 'spyNetwork',
        label: `Establish a spy network in ${this.selectedCity?.name}`,
        description:
          'Establish an intelligence network to reveal information and support future operations.',
        successText: `established in ${this.selectedCity?.name}. Enemy activity can now be monitored.`,
        show:
          this.selectedCity?.faction?.name !== this.playerFaction?.name &&
          this.playerFaction.spies.some(
            (c) => c.id === this.selectedCity?.id,
          ) === false &&
          Formulae.getDistanceToClosestCity(
            this.selectedCity,
            this.playerFaction,
          ) !== Infinity,
        stat: CharacterStat.Agility,
        requirement: this.getCommandRequirement('spyNetwork'),
        bgColor: 'bg-yellow-700',
        textColor: 'slate-100',
        context: {
          characters: [],
          fiefs: [],
          factions: [this.playerFaction],
          cities: [this.selectedCity],
        },
      },
      {
        id: 'fortify',
        label: `Fortify ${this.selectedCity?.name}'s defenses`,
        description: `Strengthen the province defenses against future enemy attacks. Current city's fortification level : ${this.selectedCity.stats.security}.`,
        successText: `have reinforced ${this.selectedCity?.name}'s defenses. Security has increased.`,
        show:
          this.selectedCity?.faction?.name === this.playerFaction?.name &&
          this.playerFaction.stats.security > 3,
        stat: CharacterStat.Endurance,
        requirement: this.getCommandRequirement('fortify'),
        bgColor: 'bg-blue-700',
        textColor: 'slate-100',
        context: {
          characters: [],
          fiefs: [],
          factions: [this.playerFaction],
          cities: [this.selectedCity],
        },
      },
      {
        id: 'askTruce',
        label: `Negotiate truce with ${this.selectedCity?.faction?.name}`,
        description: `Send officers to negotiate the end of the conflict against the ${this.selectedCity.faction.name} faction.`,
        successText: `negotiations succeeded. The war with ${this.selectedCity?.faction?.name} has ended.`,
        show: this.isFactionAtWar(),
        stat: CharacterStat.Charisma,
        requirement: this.getCommandRequirement('askTruce'),
        bgColor: 'bg-emerald-700',
        textColor: 'slate-100',
        context: {
          characters: [],
          fiefs: [],
          factions: [this.playerFaction, this.selectedCity.faction],
          cities: [],
        },
      },
      {
        id: 'random',
        label: 'Random event',
        description:
          'Trigger a random event that may bring unexpected rewards or setbacks.',
        successText:
          'An unexpected event has occurred. Its consequences will shape the future of your faction.',
        show: this.selectedCity?.faction?.name === this.playerFaction?.name,
        stat: null,
        requirement: null,
        bgColor: 'bg-slate-100',
        textColor: 'text-black',
        context: {
          characters: [],
          fiefs: [],
          factions: [this.playerFaction],
          cities: [this.selectedCity],
        },
      },
    ];

    const remainingCityFief = this.selectedCity.fiefs.filter(
      (f) => f.faction !== this.playerFaction,
    );

    if (remainingCityFief.length === 1) {
      const fief = remainingCityFief[0];
      this.commands.push({
        id: 'battle',
        label: `Decisive battle for ${this.selectedCity?.name}!`,
        description: `Launch an assault to seize control of ${this.selectedCity?.name} by capturing ${fief.type}.`,
        successText: `${this.selectedCity?.name} is ours!`,
        show:
          this.isCityNeighbor() &&
          this.isFactionAtWar() &&
          fief.faction !== this.playerFaction &&
          this.selectedCity.fiefs.filter(
            (f) => f.faction !== this.playerFaction,
          ).length === 1,
        stat: null,
        requirement: null,
        bgColor: 'bg-red-700',
        textColor: 'slate-100',
        context: {
          characters: [],
          fiefs: [fief],
          factions: [this.playerFaction, this.selectedCity?.faction],
          cities: [],
        },
      });

      return;
    }

    this.selectedCity.fiefs.forEach((f) => {
      if (!this.selectedCity || !this.playerFaction || !this.cities) return;

      this.commands.push({
        id: 'battle',
        label: `Attack ${this.selectedCity?.name}'s ${f.type}!`,
        description: `Launch an assault to seize control of ${this.selectedCity?.name}'s ${f.type}.`,
        successText: `${this.selectedCity?.name}'s ${f.type} is ours!`,
        show:
          this.isCityNeighbor() &&
          this.isFactionAtWar() &&
          f.faction !== this.playerFaction &&
          this.selectedCity.fiefs.filter(
            (f) => f.faction !== this.playerFaction,
          ).length > 1,
        stat: null,
        requirement: null,
        bgColor: 'bg-red-700',
        textColor: 'slate-100',
        context: {
          characters: [],
          fiefs: [f],
          factions: [this.playerFaction, this.selectedCity?.faction],
          cities: [],
        },
      });
    });
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

  isFactionAtWar(): boolean {
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
        if (this.isFactionAtWar()) req += 3;
        req += Formulae.getDistanceToClosestCity(
          this.selectedCity,
          this.playerFaction,
        );
        return req;

      default:
        return base;
    }
  }

  onUpdateCommands() {
    this.buildCommands();
  }
}
