import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../../../models/character/character.model';

@Injectable({ providedIn: 'root' })
export default class CharacterStoreService {
  private charactersSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.charactersSubject.asObservable();

  updateAll(characters: Character[]) {
    this.charactersSubject.next(characters);
  }

  updateSingle(character: Character) {
    const updatedCharacters = this.getAll().filter(
      (c) => c.id !== character.id,
    );
    this.updateAll([...updatedCharacters, character]);
  }

  getAll() {
    return this.charactersSubject.getValue();
  }
}
