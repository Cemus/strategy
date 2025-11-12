import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({ providedIn: 'root' })
export default class TurnStoreService {
  private turnSubject = new BehaviorSubject<number>(1);
  turn$ = this.turnSubject.asObservable();

  changeTurn() {
    this.turnSubject.next(this.turnSubject.value + 1);
  }
}
