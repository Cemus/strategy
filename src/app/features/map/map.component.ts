import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { City } from '../../core/models/city.model';
import { Faction } from '../../core/models/faction.model';
import { CommonModule } from '@angular/common';
import { citiesSetup } from '../../core/utils/cities-setup-utils';
import { GameStoreService } from '../../core/services/game-store.service';
import { MapControlsDirective } from '../../directives/map-controls.directive';
import { CityCommandsMenuComponent } from '../city-commands/city-commands-menu/city-commands-menu.component';

@Component({
  selector: 'app-map',
  imports: [CommonModule, MapControlsDirective, CityCommandsMenuComponent],
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

  constructor(private gameStore: GameStoreService) {}

  ngOnInit() {
    this.selectedCity = this.gameStore.getSelectedCity();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initialized = true;
      this.setupCities();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialized && (changes['cities'] || changes['playerFaction'])) {
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
    this.gameStore.updateSelectedCity(city);
    this.selectedCity = this.gameStore.getSelectedCity();
  }
}
