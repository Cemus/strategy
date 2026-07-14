import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameStoreService } from '../../../core/services/store/game-store.service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export abstract class ModalComponent implements OnInit, OnDestroy {
  constructor(private readonly store: GameStoreService) {}

  ngOnInit(): void {
    this.open();
  }

  ngOnDestroy(): void {
    this.close();
  }

  public open() {
    this.store.map.toggleMapControls(false);
  }

  public close() {
    this.store.map.toggleMapControls(true);
  }
}
