import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FiefType } from '../../../core/enums/fief/fief-type.enum';
import { Fief } from '../../../core/models/fief/fief.model';
import { FiefAction } from '../../../core/enums/fief/fief-action.enum';
import { FormsModule } from '@angular/forms';
import { CharacterAvatarComponent } from '../../../shared/components/character-avatar/character-avatar.component';

@Component({
  selector: 'app-assigned-character',
  imports: [FormsModule, CharacterAvatarComponent],
  templateUrl: './assigned-character.component.html',
  styleUrl: './assigned-character.component.css',
})
export class AssignedCharacterComponent {
  @Input() fief?: Fief;
  @Output() openCharacterSelectionModal = new EventEmitter<void>();

  protected fiefTypeEnum = FiefType;

  emitOpenCharacterSelectionModal() {
    this.openCharacterSelectionModal.emit();
  }

  onActionSelected(event: Event) {
    if (!this.fief) return;

    const selectedValue = (event.target as HTMLSelectElement).value;
    this.fief.currentAction = selectedValue as FiefAction;
  }

  getAvailableFiefActions() {
    if (!this.fief) return;

    return this.fief
      .getAvailableActions()
      .filter((action) => action !== this.fief?.currentAction);
  }
}
