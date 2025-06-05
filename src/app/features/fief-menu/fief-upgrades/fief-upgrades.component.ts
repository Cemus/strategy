import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Fief, FiefUpgrade } from '../../../core/models/fief.model';
import { FiefType } from '../../../core/enums/fief-type.enum';
import { GameStoreService } from '../../../core/services/game-store.service';

@Component({
  selector: 'app-fief-upgrades',
  imports: [CommonModule],
  templateUrl: './fief-upgrades.component.html',
  styleUrl: './fief-upgrades.component.css',
})
export class FiefUpgradesComponent {
  @Input() fief!: Fief;

  protected fiefTypeEnum = FiefType;

  constructor(private gameStore: GameStoreService) {}

  buildFief(upgrade: FiefUpgrade) {
    this.gameStore.upgradeFief(this.fief.id, upgrade);
  }
}
