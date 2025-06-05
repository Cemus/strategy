import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Fief } from '../../../core/models/fief.model';
import { FiefType } from '../../../core/enums/fief-type.enum';

@Component({
  selector: 'app-fief-actions',
  imports: [CommonModule],
  templateUrl: './fief-actions.component.html',
  styleUrl: './fief-actions.component.css',
})
export class FiefActionsComponent {
  @Input() fief!: Fief;

  protected fiefTypeEnum = FiefType;
}
