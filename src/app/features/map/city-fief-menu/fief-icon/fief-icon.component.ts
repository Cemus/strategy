import { Component, Input } from '@angular/core';
import { City } from '../../../../core/models/city/city.model';
import { Fief } from '../../../../core/models/fief/fief.model';
import { FiefType } from '../../../../core/enums/fief/fief-type.enum';

@Component({
  selector: 'app-fief-icon',
  imports: [],
  templateUrl: './fief-icon.component.html',
  styleUrl: './fief-icon.component.css',
})
export class FiefIconComponent {
  @Input() public selectedCity: City | null = null;
  @Input() public fief: Fief | null = null;

  protected fiefTypeEnum = FiefType;
}
