import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../../../core/models/character/character.model';
import { CommandAssignModalComponent } from '../command-assign-modal/command-assign-modal.component';
import { NgClass, SlicePipe, UpperCasePipe } from '@angular/common';
import { CommandResultModalComponent } from '../command-result-modal/command-result-modal.component';
import GameManagerService from '../../../../core/services/manager/game-manager.service';
import { Command } from '../../../../core/types/command/command';

@Component({
  selector: 'app-command',
  imports: [
    CommandAssignModalComponent,
    CommandResultModalComponent,
    NgClass,
    SlicePipe,
    UpperCasePipe,
  ],
  templateUrl: './command.component.html',
  styleUrl: './command.component.css',
})
export class CommandComponent {
  @Input() command?: Command;
  @Input() characters: Character[] = [];

  @Output() updateCommands = new EventEmitter();

  protected isAssignModalOpened: boolean = false;
  protected isResultModalOpened: boolean = false;
  protected usedCharacters: Character[] = [];

  constructor(private readonly manager: GameManagerService) {}

  openAssignModal(): void {
    this.usedCharacters = [];

    this.isAssignModalOpened = true;
  }

  onCloseAssignModal(): void {
    this.isAssignModalOpened = false;
  }

  onCloseResultModal(): void {
    this.isResultModalOpened = false;
  }

  onConfirmCommand(characters: Character[]) {
    if (this.command) {
      const factionId = this.characters[0].faction.id;

      this.manager.command.execute(this.command);
      characters.forEach((c) => {
        const character = this.manager.character.exhaust(c.id);
        if (character) {
          this.usedCharacters.push(character);
        }
      });
      this.manager.faction.decreaserActionCount(factionId);

      this.updateCommands.emit();

      this.isResultModalOpened = true;
    }
  }

  textInfoStyle(): string {
    return `px-2 w-3/4 lg:text-base text-sm`;
  }
}
