import { Component, Input, OnInit } from '@angular/core';
import { Fief } from '../../../../core/models/fief/fief.model';
import { FiefType } from '../../../../core/enums/fief/fief-type.enum';

@Component({
  selector: 'app-fief-icon',
  imports: [],
  templateUrl: './fief-icon.component.html',
  styleUrl: './fief-icon.component.css',
})
export class FiefIconComponent implements OnInit {
  @Input() public fief: Fief | null = null;

  protected fiefTypeEnum = FiefType;

  ngOnInit(): void {
    console.log('test');
    console.log(this.fief);
  }
}
