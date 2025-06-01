import { Component, Input } from '@angular/core';
import { City } from '../../../core/models/city.model';
import { Faction } from '../../../core/models/faction.model';
import { CommonModule } from '@angular/common';
import { BuildCommandsComponent } from '../build-commands/build-commands.component';

@Component({
  selector: 'app-city-commands-menu',
  imports: [CommonModule, BuildCommandsComponent],
  templateUrl: './city-commands-menu.component.html',
  styleUrl: './city-commands-menu.component.css',
})
export class CityCommandsMenuComponent {
  @Input() selectedCity?: City | null;
  @Input() playerFaction?: Faction;
  @Input() cities?: City[];
}
