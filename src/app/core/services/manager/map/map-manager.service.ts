import { Injectable } from '@angular/core';
import { GameStoreService } from '../../store/game-store.service';
import { MapSubject } from '../../../types/map/map-subject.interface';

@Injectable({
  providedIn: 'root',
})
export class MapManagerService {
  public map$;
  constructor(private readonly store: GameStoreService) {
    this.map$ = store.map.map$;
  }

  update(mapSubject: MapSubject) {
    this.store.map.update(mapSubject);
  }

  toggleMapControls(toggle: boolean) {
    const currentMapSubject = this.store.map.getMapSubject();
    const updatedMapSubject = {
      scale: currentMapSubject.scale,
      translationX: currentMapSubject.translationX,
      translationY: currentMapSubject.translationY,
      pause: !toggle,
    };
    this.store.map.update(updatedMapSubject);
  }

  areMapControlsPaused() {
    return this.store.map.getMapSubject().pause;
  }
}
