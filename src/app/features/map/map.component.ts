import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { GameStoreService } from '../../core/services/store/game-store.service';

import { City } from '../../core/models/city/city.model';
import { Faction } from '../../core/models/faction/faction.model';
import { MapControlsDirective } from '../../directives/map-controls.directive';
import { CityCommandsMenuComponent } from './city-commands/city-commands-menu/city-commands-menu.component';
import { CityFieftMenuComponent } from './city-fief-menu/city-fief-menu.component';
import { citiesSetup } from '../../core/utils/cities-setup.utils';
import GameManagerService from '../../core/services/manager/game-manager.service';

@Component({
  selector: 'app-map',
  imports: [
    MapControlsDirective,
    CityCommandsMenuComponent,
    CityFieftMenuComponent,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  standalone: true,
})
export class MapComponent implements OnChanges, AfterViewInit {
  @Input() playerFaction?: Faction;
  @Input() factions?: Faction[];
  @Input() cities?: City[];

  @ViewChild('svgRef', { static: true }) svgRef!: ElementRef<SVGSVGElement>;
  @ViewChild('mapContainerRef', { static: false })
  mapContainerRef!: ElementRef<HTMLDivElement>;

  selectedCity: City | null = null;
  isDragging = false;
  private initialized = false;

  constructor(private manager: GameManagerService) {}

  ngOnInit() {
    this.selectedCity = this.manager.city.getSelected();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initialized = true;
      this.setupCities();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.initialized &&
      (changes['cities'] || changes['playerFaction'] || changes['factions'])
    ) {
      this.setupCities();
    }
  }

  setupCities() {
    const svg = this.svgRef?.nativeElement;
    if (svg && this.cities && this.factions) {
      citiesSetup(svg, this.cities, this.factions);
    }
  }

  handleCitySelection(city: City) {
    this.manager.city.updateSelected(city);
    this.selectedCity = this.manager.city.getSelected();
  }
}
