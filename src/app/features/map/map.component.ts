import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { City } from '../../core/models/city.model';
import { Faction } from '../../core/models/faction.model';
import { CommonModule } from '@angular/common';
import { citiesSetup } from '../../core/utils/cities-setup-utils';
import { GameStoreService } from '../../core/services/game-store.service';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() playerFaction?: Faction;

  @ViewChild('svgRef', { static: false }) svgRef!: ElementRef<SVGSVGElement>;
  @ViewChild('mapContainerRef', { static: false })
  mapContainerRef!: ElementRef<HTMLDivElement>;

  selectedCity: City | null = null;
  cities: City[] = [];
  factions: Faction[] = [];
  isDragging = false;

  constructor(private gameStore: GameStoreService) {}

  ngAfterViewInit() {
    this.setupCities();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cities'] && this.svgRef) {
      this.setupCities();
    }
  }

  ngOnInit() {
    this.cities = this.gameStore.getAllCities();
    this.factions = this.gameStore.getCurrentFactions();
    this.selectedCity = this.gameStore.getSelectedCity();
  }

  setupCities() {
    if (this.svgRef?.nativeElement) {
      citiesSetup(this.svgRef.nativeElement, this.cities, this.factions);
    }
  }

  onMouseDown() {
    this.isDragging = true;
  }

  onTouchStart() {
    this.isDragging = true;
  }

  handleCitySelection(city: City) {
    this.gameStore.updateSelectedCity(city);
  }
}
