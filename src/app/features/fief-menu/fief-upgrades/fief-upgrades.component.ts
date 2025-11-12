import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FiefType } from '../../../core/enums/fief-type.enum';
import { GameStoreService } from '../../../core/services/game-store.service';
import GameManager from '../../../core/services/manager/game-manager';
import { Fief, FiefUpgrade } from '../../../core/models/fief/fief.model';

@Component({
  selector: 'app-fief-upgrades',
  imports: [CommonModule],
  templateUrl: './fief-upgrades.component.html',
  styleUrl: './fief-upgrades.component.css',
})
export class FiefUpgradesComponent {
  @Input() fief!: Fief;

  protected fiefTypeEnum = FiefType;

  constructor(private manager: GameManager) {}

  buildFief(upgrade: FiefUpgrade) {
    console.log('build');
    this.manager.upgradeFief(this.fief.id, upgrade);
  }
}
