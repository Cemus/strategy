import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FiefType } from '../../../core/enums/fief/fief-type.enum';
import GameManager from '../../../core/services/manager/game-manager.service';
import { Fief, FiefUpgrade } from '../../../core/models/fief/fief.model';

@Component({
  selector: 'app-fief-upgrades',
  imports: [CommonModule],
  templateUrl: './fief-upgrades.component.html',
  styleUrl: './fief-upgrades.component.css',
})
export class FiefUpgradesComponent {
  @Input() fief!: Fief;
  @Output() destroyFief = new EventEmitter<void>();

  protected fiefTypeEnum = FiefType;

  constructor(private manager: GameManager) {}

  buildFief(upgrade: FiefUpgrade) {
    this.manager.fief.upgradeFief(this.fief.id, upgrade);
  }

  emitDestroyFief() {
    this.destroyFief.emit();
  }
}
