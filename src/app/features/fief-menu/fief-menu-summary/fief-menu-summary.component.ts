import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FiefType } from '../../../core/enums/fief/fief-type.enum';
import { Fief } from '../../../core/models/fief/fief.model';
import { CharacterAvatarComponent } from '../../character/character-avatar/character-avatar.component';

@Component({
  selector: 'app-fief-menu-summary',
  imports: [CharacterAvatarComponent],
  templateUrl: './fief-menu-summary.component.html',
  styleUrl: './fief-menu-summary.component.css',
})
export class FiefMenuSummaryComponent {
  @Input() fief?: Fief;
  @Output() destroyFief = new EventEmitter();

  protected fiefTypeEnum = FiefType;

  emitDestroyFief() {
    this.destroyFief.emit();
  }
}
