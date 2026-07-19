import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { City } from '../../../models/city/city.model';

@Injectable({ providedIn: 'root' })
export default class CityStoreService {
  private selectedCitySubject = new BehaviorSubject<City | null>(null);
  selectedCity$ = this.selectedCitySubject.asObservable();

  private citiesSubject = new BehaviorSubject<City[]>([]);
  cities$ = this.citiesSubject.asObservable();

  updateAll(cities: City[]) {
    this.citiesSubject.next(cities);
  }

  updateSingle(city: City) {
    const cities = this.getAll().filter((c) => c.id !== city.id);
    this.updateAll([...cities, city]);
  }

  getSelected() {
    return this.selectedCitySubject.getValue();
  }

  getAll() {
    return this.citiesSubject.getValue();
  }

  getCityById(id: string) {
    return this.getAll().find((c) => c.id === id);
  }

  updateSelected(city: City | null) {
    this.selectedCitySubject.getValue() == city
      ? this.selectedCitySubject.next(null)
      : this.selectedCitySubject.next(city);
  }
}
