import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameStoreService } from '../../core/services/store/game-store.service';
import { FiefUpgradesComponent } from './fief-upgrades/fief-upgrades.component';
import GameManager from '../../core/services/manager/game-manager.service';
import { Fief, FiefUpgrade } from '../../core/models/fief/fief.model';
import { FiefIconComponent } from '../map/city-fief-menu/fief-icon/fief-icon.component';
import { City } from '../../core/models/city/city.model';
import { AvailableCharactersComponent } from '../../shared/components/available-characters/available-characters.component';
import { AssignedCharacterComponent } from './assigned-character/assigned-character.component';
import { FiefType } from '../../core/enums/fief/fief-type.enum';
import { Character } from '../../core/models/character/character.model';

@Component({
  selector: 'app-fief-menu',
  imports: [
    FiefUpgradesComponent,
    FiefIconComponent,

    AvailableCharactersComponent,
    AssignedCharacterComponent,
  ],
  templateUrl: './fief-menu.component.html',
  styleUrl: './fief-menu.component.css',
  standalone: true,
})
export class FiefMenuComponent implements OnInit {
  @ViewChild('characterDialog')
  private dialog?: ElementRef<HTMLDialogElement>;
  protected selectedFief: Fief | null = null;
  protected selectedCity: City | null = null;
  protected fiefTypeEnum = FiefType;
  protected isModalOpened = false;

  constructor(private readonly manager: GameManager) {}

  ngOnInit(): void {
    this.selectedFief = this.manager.fief.getSelected();
    this.selectedCity = this.manager.city.getSelected();
  }

  toggleModal() {
    this.isModalOpened = !this.isModalOpened;
  }

  handleDestroyFief() {
    if (!this.selectedFief) return;

    this.manager.fief.destroyFief(this.selectedFief.id);
  }

  buildFief(upgrade: FiefUpgrade) {
    if (!this.selectedFief) return;

    this.manager.fief.upgradeFief(this.selectedFief?.id, upgrade);
  }

  onAssignCharacterToFief(character: Character) {
    if (!this.selectedFief) return;
    this.selectedFief.assigned == character
      ? this.manager.fief.assignCharacter(this.selectedFief.id, null)
      : this.manager.fief.assignCharacter(this.selectedFief.id, character);
  }
}
