import { Component, Input } from '@angular/core';
import { Faction } from '../../../core/models/faction/faction.model';
import { GameStoreService } from '../../../core/services/game-store.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  @Input() playerFaction!: Faction;
  @Input() currentMenu!: string;

  constructor(private store: GameStoreService) {}

  onMenuClick(menu: string) {
    this.store.view.update(menu);
  }
}
