import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { City } from '../../../core/models/city/city.model';
import { GameStoreService } from '../../../core/services/game-store.service';
import { Fief } from '../../../core/models/fief/fief.model';

@Component({
  selector: 'app-city-fief-menu',
  imports: [CommonModule],
  templateUrl: './city-fief-menu.component.html',
  styleUrl: './city-fief-menu.component.css',
})
export class CityFieftMenuComponent {
  @Input() selectedCity?: City | null;

  constructor(private store: GameStoreService) {}

  onFiefClick(fief: Fief) {
    this.store.fief.updateSelectedFief(fief);
    this.store.view.update('fief');
  }
}
