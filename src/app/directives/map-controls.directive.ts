import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { GameStoreService } from '../core/services/game-store.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appMapControls]',
  standalone: true,
})
export class MapControlsDirective implements OnInit, OnDestroy {
  private svgRef!: SVGSVGElement | null;

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
    this.setupListeners();
    this.zoomSubscription = this.gameStore.zoomScale$.subscribe((scale) => {
      this.scale = scale;
      this.applyTransform();
    });
  }

  ngOnDestroy(): void {
    this.removeListeners();
    this.zoomSubscription?.unsubscribe();
  }

  onMouseDown(event: MouseEvent) {
    this.dragStart = { x: event.clientX, y: event.clientY };
  }

  onMouseMove(event: MouseEvent) {
    if (event.buttons === 0) return;

    const dx = event.clientX - this.dragStart.x;
    const dy = event.clientY - this.dragStart.y;

    this.translate.x += dx;
    this.translate.y += dy;
    this.dragStart = { x: event.clientX, y: event.clientY };

    this.applyTransform();
  }

  onTouchStart(event: TouchEvent) {
    const touch = event.touches[0];

    if (!touch) return;

    this.dragStart = { x: touch.clientX, y: touch.clientY };
  }

  onTouchMove(event: TouchEvent) {
    if (event.touches.length === 0) return;

    const touch = event.touches[0];
    const dx = touch.clientX - this.dragStart.x;
    const dy = touch.clientY - this.dragStart.y;

    this.translate.x += dx;
    this.translate.y += dy;
    this.dragStart = { x: touch.clientX, y: touch.clientY };

    this.applyTransform();
  }

  private onWheel = (event: WheelEvent) => {
    const zoomSpeed = 0.005;
    this.scale += -event.deltaY * zoomSpeed;
    this.scale = Math.max(3, Math.min(7, this.scale));
    this.gameStore.updateZoomScale(this.scale);

    this.applyTransform();
  };

  private applyTransform() {
    if (!this.svgRef) return;
    this.svgRef.style.transform = `translate(${this.translate.x}px, ${this.translate.y}px) scale(${this.scale})`;
  }

  private setupListeners() {
    this.elRef.nativeElement.addEventListener('wheel', this.onWheel, {
      passive: true,
    });
    this.elRef.nativeElement.addEventListener(
      'touchmove',
      (e) => this.onTouchMove(e),
      {
        passive: true,
      }
    );

    this.elRef.nativeElement.addEventListener(
      'touchstart',
      (e) => this.onTouchStart(e),
      {
        passive: true,
      }
    );

    this.elRef.nativeElement.addEventListener(
      'mousedown',
      (e) => this.onMouseDown(e),
      {
        passive: true,
      }
    );
    this.elRef.nativeElement.addEventListener(
      'mousemove',
      (e) => this.onMouseMove(e),
      {
        passive: true,
      }
    );
  }

  private removeListeners() {
    this.elRef.nativeElement.removeEventListener('wheel', this.onWheel);
    this.elRef.nativeElement.removeEventListener('touchmove', (e) =>
      this.onTouchMove(e)
    );

    this.elRef.nativeElement.removeEventListener('touchstart', (e) =>
      this.onTouchStart(e)
    );

    this.elRef.nativeElement.removeEventListener('mousedown', (e) =>
      this.onMouseDown(e)
    );
    this.elRef.nativeElement.removeEventListener('mousemove', (e) =>
      this.onMouseMove(e)
    );
  }
}
