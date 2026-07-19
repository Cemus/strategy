import { Injectable } from '@angular/core';
import { GameStoreService } from '../../store/game-store.service';

@Injectable({
  providedIn: 'root',
})
export class ViewManagerservice {
  public selectedMenu$;
  constructor(private readonly store: GameStoreService) {
    this.selectedMenu$ = this.store.view.selectedMenu$;
  }
}
