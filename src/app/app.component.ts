import { Component, OnInit } from '@angular/core';
import { City } from './core/models/city.model';
import { Faction } from './core/models/faction/faction.model';
import { GameStoreService } from './core/services/game-store.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FiefMenuComponent } from './features/fief-menu/fief-menu.component';
import { TurnReportComponent } from './features/turn-report/turn-report.component';
import { MapComponent } from './features/map/map.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MapComponent,
    HeaderComponent,
    FooterComponent,
    FiefMenuComponent,
    TurnReportComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public title = 'dynasty-warlords';

  protected loading: boolean = true;
  protected factions: Faction[] = [];
  protected cities: City[] = [];
  protected menu = '';
  protected playerFaction!: Faction;

  constructor(private gameStore: GameStoreService) {}

  async ngOnInit(): Promise<void> {
    if (!this.gameStore.isInitialized()) {
      await this.gameStore.init();
    }
    this.factions = this.gameStore.getAllFactions();
    this.cities = this.gameStore.getAllCities();

    this.playerFaction = this.factions.find((f) => f.player)!;

    this.gameStore.selectedMenu$.subscribe((menu) => {
      this.menu = menu;
    });

    this.loading = false;
  }
}
