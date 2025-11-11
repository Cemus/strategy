import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MapSubject } from '../../types/game-store.interface';

@Injectable({ providedIn: 'root' })
export default class MapStoreService {
  private mapSubject = new BehaviorSubject<MapSubject>({
    scale: 0.5,
    translationX: 0,
    translationY: 0,
  });
  map$ = this.mapSubject.asObservable();

  update(mapInfos: MapSubject) {
    this.mapSubject.next(mapInfos);
  }
}
