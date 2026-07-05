import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Character } from '../../../core/models/character/character.model';
import { FiefType } from '../../../core/enums/fief/fief-type.enum';
import GameManager from '../../../core/services/manager/game-manager.service';
import { Fief } from '../../../core/models/fief/fief.model';

@Component({
  selector: 'app-available-characters',
  imports: [CommonModule],
  templateUrl: './available-characters.component.html',
  styleUrl: './available-characters.component.css',
})
export class AvailableCharactersComponent {
  @Input() fief?: Fief;

  protected fiefTypeEnum = FiefType;

  constructor(private readonly manager: GameManager) {}

  assignCharacterToFief(character: Character) {
    if (!this.fief) return;
    this.fief.assigned == character
      ? this.manager.fief.assignCharacter(this.fief.id, null)
      : this.manager.fief.assignCharacter(this.fief.id, character);
  }

  getTraitLabels(character: Character): string {
    return (
      character.traits
        ?.map((t) => t.label.charAt(0).toUpperCase() + t.label.slice(1))
        .join(', ') ?? ''
    );
  }
}
