import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-stat-display',
  imports: [CommonModule, SharedModule],
  templateUrl: './stat-display.component.html',
  styleUrl: './stat-display.component.css',
})
export class StatDisplayComponent {
  @Input() statName: string = '';
  @Input() currentStatValue: number = 0;
  @Input() previousStatValue: number = 0;

  statComparison(): string {
    if (this.statName == 'gold') {
      console.log(this.currentStatValue);
      console.log(this.previousStatValue);
    }
    if (this.currentStatValue === this.previousStatValue) {
      return 'equal';
    } else if (this.currentStatValue > this.previousStatValue) {
      return 'superior';
    } else {
      return 'inferior';
    }
  }
}
