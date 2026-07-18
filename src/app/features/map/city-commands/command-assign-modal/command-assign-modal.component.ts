import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Command } from '../build-commands/build-commands.component';
import { AvailableCharactersComponent } from '../../../../shared/components/available-characters/available-characters.component';
import { Character } from '../../../../core/models/character/character.model';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { CharacterAvatarComponent } from '../../../../shared/components/character-avatar/character-avatar.component';

@Component({
  selector: 'app-command-assign-modal',
  imports: [AvailableCharactersComponent, CharacterAvatarComponent],
  templateUrl: './command-assign-modal.component.html',
  styleUrl: './command-assign-modal.component.css',
})
export class CommandAssignModalComponent extends ModalComponent {
  @Input() command?: Command;
  @Input() characters: Character[] = [];

  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmCommand = new EventEmitter<Character[]>();

  private initMessage: Record<string, string> = {
    '': 'Select enough characters to fullfill the requirements',
  };
  protected currentStatScore: number = 0;
  protected tempCharactersMap: Map<string, Character> = new Map();
  protected message: Record<string, string> = this.initMessage;

  areRequirementsFullfilled() {
    if (this.command?.requirement) {
      return this.currentStatScore >= this.command.requirement;
    }
    return false;
  }

  emitCloseCommandModal() {
    this.closeModal.emit();
  }

  onAssignCharacterToMission(character: Character) {
    if (character.exhausted) {
      this.updateMessage({ error: 'This character is exhausted this turn' });
      setTimeout(() => {
        this.updateMessage();
      }, 2000);
      return;
    }
    if (this.tempCharactersMap.get(character.id)) {
      this.tempCharactersMap.delete(character.id);
    } else {
      if (!character.job) {
        this.tempCharactersMap.set(character.id, character);
      } else {
      }
    }
    this.updateStatScore();
    this.updateMessage();
  }

  updateMessage(message?: Record<string, string>): void {
    if (message) {
      this.message = { error: 'This character is exhausted this turn' };
      return;
    }
    if (this.areRequirementsFullfilled()) {
      this.message = { success: 'Requirements fullfilled!' };
    } else {
      this.message = {
        '': 'Select enough characters to fullfill the requirements',
      };
    }
  }

  updateStatScore() {
    this.currentStatScore = 0;

    for (const key of this.tempCharactersMap.keys()) {
      const character = this.tempCharactersMap.get(key);

      if (character?.stats.governance) {
        this.currentStatScore += character.stats.governance;
      }
    }
  }

  emitConfirmCommand() {
    this.confirmCommand.emit(Array.from(this.tempCharactersMap.values()));
    this.emitCloseCommandModal();
  }
}
