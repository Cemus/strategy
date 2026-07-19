import { Component, OnDestroy, OnInit } from '@angular/core';
import GameManagerService from '../../../core/services/manager/game-manager.service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export abstract class ModalComponent implements OnInit, OnDestroy {
  constructor(protected readonly manager: GameManagerService) {}

  ngOnInit(): void {
    this.open();
  }

  ngOnDestroy(): void {
    this.close();
  }

  public open() {
    this.manager.map.toggleMapControls(false);
  }

  public close() {
    this.manager.map.toggleMapControls(true);
  }
}
