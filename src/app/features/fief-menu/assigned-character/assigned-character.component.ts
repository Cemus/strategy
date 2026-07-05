import { Component, Input } from '@angular/core';
import { FiefType } from '../../../core/enums/fief/fief-type.enum';
import { Fief } from '../../../core/models/fief/fief.model';
import { FiefActionsComponent } from '../fief-actions/fief-actions.component';

@Component({
  selector: 'app-assigned-character',
  imports: [FiefActionsComponent],
  templateUrl: './assigned-character.component.html',
  styleUrl: './assigned-character.component.css',
})
export class AssignedCharacterComponent {
  @Input() fief?: Fief;

  protected fiefTypeEnum = FiefType;
}
