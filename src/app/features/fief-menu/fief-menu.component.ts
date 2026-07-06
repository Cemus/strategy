import { Component, OnInit } from '@angular/core';
import { GameStoreService } from '../../core/services/store/game-store.service';
import { FiefUpgradesComponent } from './fief-upgrades/fief-upgrades.component';
import GameManager from '../../core/services/manager/game-manager.service';
import { Fief, FiefUpgrade } from '../../core/models/fief/fief.model';
import { FiefIconComponent } from '../map/city-fief-menu/fief-icon/fief-icon.component';
import { City } from '../../core/models/city/city.model';
import { FiefMenuNavComponent } from './fief-menu-nav/fief-menu-nav.component';
import { FiefMenuSummaryComponent } from './fief-menu-summary/fief-menu-summary.component';
import { FiefMenuCharacterComponent } from './fief-menu-character/fief-menu-character.component';

@Component({
  selector: 'app-fief-menu',
  imports: [
    FiefUpgradesComponent,
    FiefIconComponent,
    FiefMenuNavComponent,
    FiefMenuSummaryComponent,
    FiefMenuCharacterComponent,
  ],
  templateUrl: './fief-menu.component.html',
  styleUrl: './fief-menu.component.css',
  standalone: true,
})
export class FiefMenuComponent implements OnInit {
  protected selectedFief: Fief | null = null;
  protected selectedCity: City | null = null;
  protected currentPanel: 'character' | 'summary' | 'upgrade' = 'summary';

  constructor(
    private readonly store: GameStoreService,
    private readonly manager: GameManager,
  ) {}

  ngOnInit(): void {
    this.selectedFief = this.store.fief.getSelected();
    this.selectedCity = this.store.city.getSelected();
  }

  handleDestroyFief() {
    if (!this.selectedFief) return;

    this.manager.fief.destroyFief(this.selectedFief.id);
  }

  buildFief(upgrade: FiefUpgrade) {
    if (!this.selectedFief) return;

    this.manager.fief.upgradeFief(this.selectedFief?.id, upgrade);
  }

  handleChangePanel(nextPanel: 'character' | 'summary' | 'upgrade') {
    this.currentPanel = nextPanel;
  }
}
