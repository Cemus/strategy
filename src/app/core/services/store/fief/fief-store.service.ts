import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Fief } from '../../../models/fief/fief.model';

@Injectable({ providedIn: 'root' })
export default class FiefStoreService {
  private selectedFiefSubject = new BehaviorSubject<Fief | null>(null);
  selectedFief$ = this.selectedFiefSubject.asObservable();

  private fiefsSubject = new BehaviorSubject<Fief[]>([]);
  fiefs$ = this.fiefsSubject.asObservable();

  updateAll(fiefs: Fief[]) {
    this.fiefsSubject.next(fiefs);
  }

  updateSingle(fief: Fief) {
    const fiefs = this.getAll();
    this.updateAll([...fiefs, fief]);
  }

  getAll() {
    return this.fiefsSubject.getValue();
  }

  updateSelectedFief(fief: Fief) {
    this.selectedFiefSubject.next(fief);
  }

  getSelected() {
    return this.selectedFiefSubject.getValue();
  }

  getFiefById(id: string) {
    return this.getAll().find((f) => f.id === id);
  }
}
