import { Component, Input } from '@angular/core';
import { City } from '../../../core/models/city/city.model';
import { GameStoreService } from '../../../core/services/store/game-store.service';
import { Fief } from '../../../core/models/fief/fief.model';
import { FiefIconComponent } from './fief-icon/fief-icon.component';

@Component({
  selector: 'app-city-fief-menu',
  imports: [FiefIconComponent],
  templateUrl: './city-fief-menu.component.html',
  styleUrl: './city-fief-menu.component.css',
})
export class CityFieftMenuComponent {
  @Input() selectedCity!: City;

  constructor(private store: GameStoreService) {}

  onFiefClick(fief: Fief) {
    this.store.fief.updateSelectedFief(fief);
    this.store.view.update('fief');
  }
}
