import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Fief } from '../../../core/models/fief.model';
import { GameStoreService } from '../../../core/services/game-store.service';
import { Character } from '../../../core/models/character/character.model';
import { FiefType } from '../../../core/enums/fief-type.enum';

@Component({
  selector: 'app-available-characters',
  imports: [CommonModule],
  templateUrl: './available-characters.component.html',
  styleUrl: './available-characters.component.css',
})
export class AvailableCharactersComponent {
  @Input() fief!: Fief;

  protected fiefTypeEnum = FiefType;

  constructor(private gameStore: GameStoreService) {}

  assignCharacterToFief(character: Character) {
    this.fief.assigned == character
      ? this.gameStore.assignCharacterToFief(this.fief.id, null)
      : this.gameStore.assignCharacterToFief(this.fief.id, character);
  }

  getTraitLabels(character: Character): string {
    return (
      character.traits
        ?.map((t) => t.label.charAt(0).toUpperCase() + t.label.slice(1))
        .join(', ') ?? ''
    );
  }
}
