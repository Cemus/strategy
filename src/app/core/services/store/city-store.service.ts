import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { City } from '../../models/city/city.model';

@Injectable({ providedIn: 'root' })
export default class CityStoreService {
  private selectedCitySubject = new BehaviorSubject<City | null>(null);
  selectedCity$ = this.selectedCitySubject.asObservable();

  private citiesSubject = new BehaviorSubject<City[]>([]);
  cities$ = this.citiesSubject.asObservable();

  updateAll(cities: City[]) {
    this.citiesSubject.next(cities);
  }

  updateSingle() {}

  getSelected() {
    return this.selectedCitySubject.getValue();
  }

  getAll() {
    return this.citiesSubject.getValue();
  }

  updateSelected(city: City | null) {
    this.selectedCitySubject.getValue() == city
      ? this.selectedCitySubject.next(null)
      : this.selectedCitySubject.next(city);
  }
}
