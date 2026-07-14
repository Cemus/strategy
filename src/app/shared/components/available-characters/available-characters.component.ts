import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../../core/models/character/character.model';

@Component({
  selector: 'app-available-characters',
  imports: [CommonModule],
  templateUrl: './available-characters.component.html',
  styleUrl: './available-characters.component.css',
})
export class AvailableCharactersComponent {
  @Input() characters: Character[] = [];
  @Input() tempSelectedCharacters: Map<string, Character> = new Map();

  @Output() closeCharacterSelectionModal = new EventEmitter<void>();
  @Output() assignCharacter = new EventEmitter<Character>();

  emitAssignCharacter(character: Character) {
    this.assignCharacter.emit(character);
  }

  getTraitLabels(character: Character): string {
    return (
      character.traits
        ?.map((t) => t.label.charAt(0).toUpperCase() + t.label.slice(1))
        .join(', ') ?? ''
    );
  }

  emitCloseCharacterSelectionModal() {
    this.closeCharacterSelectionModal.emit();
  }
}
