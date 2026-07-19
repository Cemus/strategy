import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from '../../../core/models/character/character.model';
import { CharacterAvatarComponent } from '../character-avatar/character-avatar.component';

@Component({
  selector: 'app-available-characters',
  imports: [CommonModule, CharacterAvatarComponent],
  templateUrl: './available-characters.component.html',
  styleUrl: './available-characters.component.css',
})
export class AvailableCharactersComponent implements OnInit {
  @Input() characters: Character[] = [];
  @Input() tempSelectedCharacters: Map<string, Character> = new Map();

  @Output() closeCharacterSelectionModal = new EventEmitter<void>();
  @Output() assignCharacter = new EventEmitter<Character>();

  ngOnInit(): void {
    this.characters.sort((a, b) => {
      if (a.exhausted !== b.exhausted) {
        return Number(a.exhausted) - Number(b.exhausted);
      }

      if (a.job !== b.job) {
        return Number(!!a.job) - Number(!!b.job);
      }

      return 0;
    });
  }

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
