import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildCommandsComponent } from '../build-commands/build-commands.component';
import { Faction } from '../../../../core/models/faction/faction.model';
import { City } from '../../../../core/models/city.model';

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
