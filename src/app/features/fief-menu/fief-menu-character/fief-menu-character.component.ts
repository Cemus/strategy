import { Component, Input } from '@angular/core';
import { AssignedCharacterComponent } from '../assigned-character/assigned-character.component';
import { Fief } from '../../../core/models/fief/fief.model';

@Component({
  selector: 'app-fief-menu-character',
  imports: [AssignedCharacterComponent],
  templateUrl: './fief-menu-character.component.html',
  styleUrl: './fief-menu-character.component.css',
})
export class FiefMenuCharacterComponent {
  @Input() fief?: Fief;
}
