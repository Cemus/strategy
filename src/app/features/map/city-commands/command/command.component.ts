import { Component, Input } from '@angular/core';
import { Command } from '../build-commands/build-commands.component';
import { Character } from '../../../../core/models/character/character.model';
import { CommandAssignModalComponent } from '../command-assign-modal/command-assign-modal.component';
import { NgClass } from '@angular/common';
import { CommandResultModalComponent } from '../command-result-modal/command-result-modal.component';
import GameManagerService from '../../../../core/services/manager/game-manager.service';
import { GameStoreService } from '../../../../core/services/store/game-store.service';

@Component({
  selector: 'app-command',
  imports: [CommandAssignModalComponent, CommandResultModalComponent, NgClass],
  templateUrl: './command.component.html',
  styleUrl: './command.component.css',
})
export class CommandComponent {
  @Input() command?: Command;
  @Input() characters: Character[] = [];

  protected isAssignModalOpened: boolean = false;
  protected isResultModalOpened: boolean = false;
  protected usedCharacters: Character[] = [];

  constructor(
    private readonly manager: GameManagerService,
    private readonly store: GameStoreService,
  ) {}

  openAssignModal(): void {
    this.isAssignModalOpened = true;
  }

  onCloseAssignModal(): void {
    this.isAssignModalOpened = false;
  }

  onCloseResultModal(): void {
    this.isResultModalOpened = false;
  }

  onConfirmCommand(characters: Character[]) {
    const factionId = this.characters[0].faction.id;

    characters.forEach((c) => {
      const character = this.manager.character.exhaust(c.id);
      if (character) {
        this.usedCharacters.push(character);
      }
    });

    // resultat de l'action avec le mana

    this.manager.faction.decreaserActionCount(factionId);

    this.isResultModalOpened = true;
  }

  textInfoStyle(): string {
    return `px-2 w-3/4 lg:text-base text-sm`;
  }
}
