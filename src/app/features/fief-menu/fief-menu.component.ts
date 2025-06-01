import { Component, Input, OnInit } from '@angular/core';
import { GameStoreService } from '../../core/services/game-store.service';
import { Fief } from '../../core/models/fief.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fief-menu',
  imports: [CommonModule],
  templateUrl: './fief-menu.component.html',
  styleUrl: './fief-menu.component.css',
})
export class FiefMenuComponent implements OnInit {
  @Input() selectedFief: Fief | null = null;

  constructor(private gameStore: GameStoreService) {}

  ngOnInit(): void {
    this.selectedFief = this.gameStore.getSelectedFief();
    console.log(this.selectedFief);
  }
}
