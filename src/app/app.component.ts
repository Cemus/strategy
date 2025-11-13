import { Component, OnInit } from '@angular/core';
import { City } from './core/models/city/city.model';
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

  constructor(private store: GameStoreService) {}

  async ngOnInit(): Promise<void> {
    if (!this.store.isInitialized()) {
      await this.store.init();
    }
    this.factions = this.store.faction.getAll();
    this.cities = this.store.city.getAll();

    this.playerFaction = this.factions.find((f) => f.player)!;

    this.store.view.selectedMenu$.subscribe((menu) => {
      this.menu = menu;
    });

    this.loading = false;
  }
}
