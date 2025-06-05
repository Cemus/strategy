import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Fief } from '../../../core/models/fief.model';
import { FiefType } from '../../../core/enums/fief-type.enum';

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
