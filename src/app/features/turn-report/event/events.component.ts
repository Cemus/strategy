import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { WorldEvent } from '../../../core/types/world-event.interface';

@Component({
  selector: 'app-events',
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent implements OnInit, OnChanges {
  @Input() public events: WorldEvent[] = [];

  protected eventIndex = 0;
  protected internalEvents: WorldEvent[] = [];
  protected currentEvent: WorldEvent | null = null;

  ngOnInit(): void {
    this.resetEvents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events']) {
      this.resetEvents();
    }
  }

  private resetEvents(): void {
    this.internalEvents = [...this.events];
    this.eventIndex = 0;
    this.currentEvent = this.internalEvents[this.eventIndex] ?? null;
  }

  nextEvent(): void {
    this.eventIndex++;

    if (this.eventIndex < this.internalEvents.length) {
      this.currentEvent = this.internalEvents[this.eventIndex];
    } else {
      this.currentEvent = null;
    }
  }
}
