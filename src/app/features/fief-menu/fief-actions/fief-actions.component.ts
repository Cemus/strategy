import { Component, Input } from '@angular/core';
import { FiefType } from '../../../core/enums/fief/fief-type.enum';
import { FiefAction } from '../../../core/enums/fief/fief-action.enum';
import { FormsModule } from '@angular/forms';
import { Fief } from '../../../core/models/fief/fief.model';

@Component({
  selector: 'app-fief-actions',
  imports: [FormsModule],
  templateUrl: './fief-actions.component.html',
  styleUrl: './fief-actions.component.css',
})
export class FiefActionsComponent {
  @Input() fief!: Fief;

  protected fiefTypeEnum = FiefType;

  onActionSelected(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.fief.currentAction = selectedValue as FiefAction;
  }

  getAvailableFiefActions() {
    return this.fief
      .getAvailableActions()
      .filter((action) => action !== this.fief.currentAction);
  }
}
