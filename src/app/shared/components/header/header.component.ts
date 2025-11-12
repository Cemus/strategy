import { Component, OnInit } from '@angular/core';
import { GameStoreService } from '../../../core/services/game-store.service';
import { CommonModule } from '@angular/common';
import GameManager from '../../../core/services/manager/game-manager';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  protected turn: number = 1;

  constructor(
    private readonly store: GameStoreService,
    private readonly manager: GameManager,
  ) {}

  ngOnInit(): void {
    this.store.turn.turn$.subscribe((arg) => (this.turn = arg));
  }

  endTurn() {
    this.manager.endTurn();
  }
}
