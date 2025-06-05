import { Component, OnInit } from '@angular/core';
import { MapMenuComponent } from './features/map/map-menu/map-menu.component';
import { City } from './core/models/city.model';
import { Faction } from './core/models/faction.model';
import { GameStoreService } from './core/services/game-store.service';
import { buildDefaultData } from './core/utils/game-utils';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FiefMenuComponent } from './features/fief-menu/fief-menu.component';
import { TurnReportComponent } from './features/turn-report/turn-report.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MapMenuComponent,
    HeaderComponent,
    FooterComponent,
    FiefMenuComponent,
    TurnReportComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  protected title = 'dynasty-warlords';

  protected factions: Faction[] = [];
  protected cities: City[] = [];
  protected menu = '';
  protected playerFaction!: Faction;

  constructor(private gameStore: GameStoreService) {}

  ngOnInit(): void {
    const { factions, cities } = buildDefaultData();

    this.factions = factions;
    this.cities = cities;
    this.playerFaction = factions.find((f) => f.player)!;

    this.gameStore.updateFactions(factions);

    this.gameStore.selectedMenu$.subscribe((menu) => {
      this.menu = menu;
    });
  }
}
