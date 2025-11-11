import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FiefType } from '../../../core/enums/fief-type.enum';
import { Fief } from '../../../core/models/fief/fief.model';

@Component({
  selector: 'app-assigned-character',
  imports: [CommonModule],
  templateUrl: './assigned-character.component.html',
  styleUrl: './assigned-character.component.css',
})
export class AssignedCharacterComponent {
  @Input() fief!: Fief;

  protected fiefTypeEnum = FiefType;
}
