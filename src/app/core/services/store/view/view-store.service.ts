import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({ providedIn: 'root' })
export default class ViewStoreService {
  private selectedMenuSubject = new BehaviorSubject<string>('map');
  selectedMenu$ = this.selectedMenuSubject.asObservable();

  updateAll() {}

  updateSingle() {}

  update(menu: string) {
    this.selectedMenuSubject.next(menu);
  }

  get(): string {
    return this.selectedMenuSubject.getValue();
  }
}
