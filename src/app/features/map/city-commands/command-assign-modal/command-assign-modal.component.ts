import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvailableCharactersComponent } from '../../../../shared/components/available-characters/available-characters.component';
import { Character } from '../../../../core/models/character/character.model';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { CharacterAvatarComponent } from '../../../../shared/components/character-avatar/character-avatar.component';
import { Command } from '../../../../core/types/command/command';

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
  private pendingGovernorConfirmation: string | null = null;
  private confirmationTimer?: ReturnType<typeof setTimeout>;

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
      this.updateMessage({
        error: `${character.name} is exhausted this turn`,
      });
      this.resetMessageAfterDelay();
      return;
    }

    if (character.job) {
      if (this.pendingGovernorConfirmation === character.id) {
        this.pendingGovernorConfirmation = null;

        if (this.confirmationTimer) {
          clearTimeout(this.confirmationTimer);
        }

        this.selectCharacter(character);
        this.updateMessage();
        return;
      }

      this.pendingGovernorConfirmation = character.id;

      this.updateMessage({
        warning: `${character.name} is currently governor. Click again to assign.`,
      });

      this.confirmationTimer = setTimeout(() => {
        this.pendingGovernorConfirmation = null;
        this.updateMessage();
      }, 2000);

      return;
    }

    this.selectCharacter(character);
    this.updateMessage();
  }

  private selectCharacter(character: Character) {
    if (character.job) {
      this.manager.fief.assignCharacter(character.job.id, null);
    }

    if (this.tempCharactersMap.has(character.id)) {
      this.tempCharactersMap.delete(character.id);
    } else {
      this.tempCharactersMap.set(character.id, character);
    }

    this.updateStatScore();
  }

  private resetMessageAfterDelay() {
    setTimeout(() => {
      this.updateMessage();
    }, 2000);
  }

  updateMessage(message?: Record<string, string>): void {
    if (message) {
      this.message = message;
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
    if (!this.command?.stat) return;

    this.currentStatScore = 0;

    for (const key of this.tempCharactersMap.keys()) {
      const character = this.tempCharactersMap.get(key);

      if (!character) return;

      this.currentStatScore += character.stats[this.command.stat];
    }
  }

  getCharacterStat(character?: Character) {
    if (!character || !this.command?.stat) return;
    return character.stats[this.command.stat];
  }

  emitConfirmCommand() {
    this.confirmCommand.emit(Array.from(this.tempCharactersMap.values()));
    this.emitCloseCommandModal();
  }
}
