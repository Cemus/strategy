import { Component, OnInit } from '@angular/core';
import { GameStoreService } from '../../../core/services/game-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  protected turn: number = 1;

  constructor(private readonly gameStore: GameStoreService) {}

  ngOnInit(): void {
    this.gameStore.turn$.subscribe((arg) => (this.turn = arg));
  }

  endTurn() {
    this.gameStore.endTurn();
  }
}
