import { Component, Input, ViewChild } from '@angular/core';
import { Command } from '../build-commands/build-commands.component';
import { Character } from '../../../../core/models/character/character.model';
import { CommandModalComponent } from '../command-modal/command-modal.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-command',
  imports: [CommandModalComponent, NgClass],
  templateUrl: './command.component.html',
  styleUrl: './command.component.css',
})
export class CommandComponent {
  @Input() command?: Command;
  @Input() characters: Character[] = [];

  protected isModalOpened: boolean = false;

  openCommandModal(): void {
    this.isModalOpened = true;
  }

  onCloseCommandModal(): void {
    this.isModalOpened = false;
  }

  onConfirmCommand(characters: Character[]) {
    characters.forEach((c) => {
      c.exhausted = true;
    });
  }

  textInfoStyle(): string {
    return `px-2 w-3/4 lg:text-base text-sm`;
  }
}
