import { Component, Input } from '@angular/core';
import { City } from '../../core/models/city.model';
import { Faction } from '../../core/models/faction.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-commands',
  imports: [CommonModule],
  templateUrl: './city-commands.component.html',
  styleUrl: './city-commands.component.css',
})
export class CityCommandsComponent {
  @Input() selectedCity: City | null = null;
  @Input() playerFaction?: Faction;
}
