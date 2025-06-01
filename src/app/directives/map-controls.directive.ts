import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { GameStoreService } from '../core/services/game-store.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appMapControls]',
  standalone: true,
})
export class MapControlsDirective implements OnInit, OnDestroy {
  private svgRef!: SVGSVGElement | null;

  private isDragging = false;
  private dragStart = { x: 0, y: 0 };
  private translate = { x: 0, y: 0 };
  private scale = 1;
  private zoomSubscription: Subscription | undefined;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private gameStore: GameStoreService
  ) {}

  ngOnInit(): void {
    this.svgRef = this.elRef.nativeElement.querySelector('svg')!;
    this.elRef.nativeElement.addEventListener('wheel', this.onWheel, {
      passive: false,
    });
    this.zoomSubscription = this.gameStore.zoomScale$.subscribe((scale) => {
      this.scale = scale;
      this.applyTransform();
    });
  }

  ngOnDestroy(): void {
    this.elRef.nativeElement.removeEventListener('wheel', this.onWheel);
    this.zoomSubscription?.unsubscribe();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.dragStart = { x: event.clientX, y: event.clientY };
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  onMouseUp() {
    this.isDragging = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    const dx = event.clientX - this.dragStart.x;
    const dy = event.clientY - this.dragStart.y;

    this.translate.x += dx;
    this.translate.y += dy;
    this.dragStart = { x: event.clientX, y: event.clientY };

    this.applyTransform();
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    const touch = event.touches[0];

    if (!touch) return;

    this.isDragging = true;
    this.dragStart = { x: touch.clientX, y: touch.clientY };
  }

  @HostListener('touchend')
  @HostListener('touchcancel')
  onTouchEnd() {
    this.isDragging = false;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (!this.isDragging || event.touches.length === 0) return;

    const touch = event.touches[0];
    const dx = touch.clientX - this.dragStart.x;
    const dy = touch.clientY - this.dragStart.y;

    this.translate.x += dx;
    this.translate.y += dy;
    this.dragStart = { x: touch.clientX, y: touch.clientY };

    this.applyTransform();
    event.preventDefault();
  }

  private onWheel = (event: WheelEvent) => {
    event.preventDefault();

    const zoomSpeed = 0.0015;
    this.scale += -event.deltaY * zoomSpeed;
    this.scale = Math.max(0.5, Math.min(3, this.scale));
    this.gameStore.updateZoomScale(this.scale);

    this.applyTransform();
  };

  private applyTransform() {
    if (!this.svgRef) return;
    this.svgRef.style.transform = `translate(${this.translate.x}px, ${this.translate.y}px) scale(${this.scale})`;
  }
}
