import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { City } from '../../../core/models/city.model';
import { Fief } from '../../../core/models/fief.model';

@Component({
  selector: 'app-city-fief-menu',
  imports: [CommonModule],
  templateUrl: './city-fief-menu.component.html',
  styleUrl: './city-fief-menu.component.css',
})
export class CityFieftMenuComponent {
  @Input() selectedCity?: City | null;

  onDistrictClick(fief: Fief) {
    console.log(fief);
  }
}
