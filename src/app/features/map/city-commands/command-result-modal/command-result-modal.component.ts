import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../../../core/models/character/character.model';
import { CharacterAvatarComponent } from '../../../../shared/components/character-avatar/character-avatar.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { Command } from '../build-commands/build-commands.component';

@Component({
  selector: 'app-command-result-modal',
  imports: [CharacterAvatarComponent],
  templateUrl: './command-result-modal.component.html',
  styleUrl: './command-result-modal.component.css',
})
export class CommandResultModalComponent extends ModalComponent {
  @Input() command?: Command;
  @Input() usedCharacters: Character[] = [];

  @Output() closeModal = new EventEmitter<void>();

  emitCloseModal() {
    this.closeModal.emit();
  }

  getUsedCharactersNames(): string {
    const names = this.usedCharacters.map((c) => c.name);

    if (names.length === 0) return '';
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} and ${names[1]}`;

    return `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`;
  }
}
