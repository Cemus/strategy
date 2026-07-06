import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-fief-menu-nav',
  imports: [],
  templateUrl: './fief-menu-nav.component.html',
  styleUrl: './fief-menu-nav.component.css',
})
export class FiefMenuNavComponent {
  @Input() currentPanel?: 'character' | 'summary' | 'upgrade';
  @Output() changePanel = new EventEmitter<
    'character' | 'summary' | 'upgrade'
  >();

  emitChangePanel(nextPanel: 'character' | 'summary' | 'upgrade') {
    this.changePanel.emit(nextPanel);
  }
}
