import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Fief } from '../../../core/models/fief.model';
import { FiefType } from '../../../core/enums/fief-type.enum';
import { FiefAction } from '../../../core/enums/fief-action.enum';

@Component({
  selector: 'app-fief-actions',
  imports: [CommonModule],
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
