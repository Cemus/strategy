import { Component, Input, OnInit } from '@angular/core';
import { GameStoreService } from '../../core/services/game-store.service';
import { CommonModule } from '@angular/common';
import { FiefType } from '../../core/enums/fief-type.enum';
import { AssignedCharacterComponent } from './assigned-character/assigned-character.component';
import { FiefActionsComponent } from './fief-actions/fief-actions.component';
import { FiefUpgradesComponent } from './fief-upgrades/fief-upgrades.component';
import { AvailableCharactersComponent } from './available-characters/available-characters.component';
import GameManager from '../../core/services/manager/game-manager.service';
import { Fief, FiefUpgrade } from '../../core/models/fief/fief.model';
@Component({
  selector: 'app-fief-menu',
  imports: [
    CommonModule,
    AssignedCharacterComponent,
    FiefActionsComponent,
    FiefUpgradesComponent,
    AvailableCharactersComponent,
  ],
  templateUrl: './fief-menu.component.html',
  styleUrl: './fief-menu.component.css',
  standalone: true,
})
export class FiefMenuComponent implements OnInit {
  @Input() selectedFief: Fief | null = null;

  protected fiefTypeEnum = FiefType;

  constructor(
    private readonly store: GameStoreService,
    private readonly manager: GameManager,
  ) {}

  ngOnInit(): void {
    this.selectedFief = this.store.fief.getSelected();
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
