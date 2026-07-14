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

  @ViewChild('commandModal')
  private modal?: CommandModalComponent;

  protected activeCommand?: Command;
  protected isModalOpened: boolean = false;

  openCommandModal(command: Command): void {
    this.isModalOpened = true;
    this.activeCommand = command;
    this.modal?.open();
  }

  onCloseCommandModal(): void {
    this.modal?.close();
    this.isModalOpened = false;
  }

  textInfoStyle(): string {
    return `px-2 w-3/4 lg:text-base text-sm`;
  }
}
