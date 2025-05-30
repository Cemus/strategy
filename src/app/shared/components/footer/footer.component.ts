import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Faction } from '../../../core/models/faction.model';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  @Input() playerFaction!: Faction;
  @Input() currentMenu!: string;
  @Output() menuSelect = new EventEmitter<string>();

  onMenuClick(menu: string) {
    this.menuSelect.emit(menu);
  }
}
