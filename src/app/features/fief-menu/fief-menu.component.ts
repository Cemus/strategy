import { Component, Input, OnInit } from '@angular/core';
import { GameStoreService } from '../../core/services/game-store.service';
import { Fief } from '../../core/models/fief.model';
import { CommonModule } from '@angular/common';
import { Character } from '../../core/models/character/character.model';
import { FiefType } from '../../core/enums/fief-type.enum';
@Component({
  selector: 'app-fief-menu',
  imports: [CommonModule],
  templateUrl: './fief-menu.component.html',
  styleUrl: './fief-menu.component.css',
})
export class FiefMenuComponent implements OnInit {
  @Input() selectedFief: Fief | null = null;

  protected fiefTypeEnum = FiefType;

  constructor(private gameStore: GameStoreService) {}

  ngOnInit(): void {
    this.selectedFief = this.gameStore.getSelectedFief();
    console.log(this.selectedFief);
  }

  assignCharacterToFief(character: Character) {
    if (this.selectedFief) {
      this.selectedFief.assigned == character
        ? this.gameStore.assignCharacterToFief(this.selectedFief?.id, null)
        : this.gameStore.assignCharacterToFief(
            this.selectedFief?.id,
            character
          );
    }
  }

  destroyFief() {
    if (!this.selectedFief) return;

    this.gameStore.destroyFief(this.selectedFief.id);
  }

  buildFief(upgradeName: string) {
    console.log(upgradeName);
  }
}
