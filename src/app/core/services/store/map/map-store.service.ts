import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MapSubject } from '../../../types/map/map-subject.interface';

@Injectable({ providedIn: 'root' })
export default class MapStoreService {
  private mapSubject = new BehaviorSubject<MapSubject>({
    scale: 0.5,
    translationX: 0,
    translationY: 0,
    pause: false,
  });
  map$ = this.mapSubject.asObservable();

  update(mapInfos: MapSubject) {
    this.mapSubject.next(mapInfos);
  }

  toggleMapControls(toggle: boolean) {
    this.mapSubject.next({
      scale: this.mapSubject.value.scale,
      translationX: this.mapSubject.value.translationX,
      translationY: this.mapSubject.value.translationY,
      pause: !toggle,
    });
  }

  areMapControlsPaused() {
    return this.mapSubject.value.pause;
  }
}
