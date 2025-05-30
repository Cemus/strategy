import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './features/map/map.component';
import { City } from './core/models/city.model';
import { Faction } from './core/models/faction.model';
import { GameStoreService } from './core/services/game-store.service';
import { buildDefaultData } from './core/utils/game-utils';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MapComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'dynasty-warlords';

  factions: Faction[] = [];
  cities: City[] = [];
  turn = 1;
  menu = 'map';
  playerFaction!: Faction;

  constructor(private gameStore: GameStoreService) {}

  ngOnInit(): void {
    const { factions, cities } = buildDefaultData();
    this.factions = factions;
    this.cities = cities;
    this.playerFaction = factions.find((f) => f.player)!;

    this.gameStore.updateFactions(factions);
  }

  handleMenuChange(menu: string) {
    this.menu = menu;
  }
}
