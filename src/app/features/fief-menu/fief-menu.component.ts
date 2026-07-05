import { Component, Input, OnInit } from '@angular/core';
import { GameStoreService } from '../../core/services/store/game-store.service';
import { FiefType } from '../../core/enums/fief/fief-type.enum';
import { AssignedCharacterComponent } from './assigned-character/assigned-character.component';
import { FiefUpgradesComponent } from './fief-upgrades/fief-upgrades.component';
import { AvailableCharactersComponent } from './available-characters/available-characters.component';
import GameManager from '../../core/services/manager/game-manager.service';
import { Fief, FiefUpgrade } from '../../core/models/fief/fief.model';
import { FiefIconComponent } from '../map/city-fief-menu/fief-icon/fief-icon.component';
import { City } from '../../core/models/city/city.model';

@Component({
  selector: 'app-fief-menu',
  imports: [
    AssignedCharacterComponent,
    FiefUpgradesComponent,
    AvailableCharactersComponent,
    FiefIconComponent,
  ],
  templateUrl: './fief-menu.component.html',
  styleUrl: './fief-menu.component.css',
  standalone: true,
})
export class FiefMenuComponent implements OnInit {
  protected fiefTypeEnum = FiefType;
  protected selectedFief: Fief | null = null;
  protected selectedCity: City | null = null;

  constructor(
    private readonly store: GameStoreService,
    private readonly manager: GameManager,
  ) {}

  ngOnInit(): void {
    this.selectedFief = this.store.fief.getSelected();
    this.selectedCity = this.store.city.getSelected();
  }

  destroyFief() {
    if (!this.selectedFief) return;

    this.manager.fief.destroyFief(this.selectedFief.id);
  }

  buildFief(upgrade: FiefUpgrade) {
    if (!this.selectedFief) return;

    this.manager.fief.upgradeFief(this.selectedFief?.id, upgrade);
  }
}
