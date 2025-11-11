import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Fief } from '../../models/fief/fief.model';

@Injectable({ providedIn: 'root' })
export default class FiefStoreService {
  private selectedFiefSubject = new BehaviorSubject<Fief | null>(null);
  selectedFief$ = this.selectedFiefSubject.asObservable();

  updateAll() {}

  updateSingle() {}

  updateSelectedFief(fief: Fief) {
    this.selectedFiefSubject.next(fief);
  }

  getSelected() {
    return this.selectedFiefSubject.getValue();
  }
}
