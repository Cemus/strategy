import { Component, OnInit } from '@angular/core';
import { City } from './core/models/city/city.model';
import { Faction } from './core/models/faction/faction.model';
import { GameStoreService } from './core/services/store/game-store.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { FiefMenuComponent } from './features/fief-menu/fief-menu.component';
import { TurnReportComponent } from './features/turn-report/turn-report.component';
import { MapComponent } from './features/map/map.component';
import GameManagerService from './core/services/manager/game-manager.service';

@Component({
  selector: 'app-root',
  imports: [
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

  constructor(private manager: GameManagerService) {}

  async ngOnInit(): Promise<void> {
    if (!this.manager.isInitialized) {
      await this.manager.init();
    }
    this.factions = this.manager.faction.getAll();
    this.cities = this.manager.city.getAll();

    this.playerFaction = this.factions.find((f) => f.player)!;

    this.manager.view.selectedMenu$.subscribe((menu) => {
      this.menu = menu;
    });

    this.loading = false;
  }
}
