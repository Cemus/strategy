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
  private scale = 0.5;
  private zoomSubscription: Subscription | undefined;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private gameStore: GameStoreService,
  ) {}

  ngOnInit(): void {
    this.svgRef = this.elRef.nativeElement.querySelector('svg')!;
    this.setupListeners();

    this.zoomSubscription = this.gameStore.map$.subscribe((map) => {
      this.scale = map.scale;
      this.translate = { x: map.translationX, y: map.translationY };
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

    this.gameStore.updateMap({
      scale: this.scale,
      translationX: this.translate.x,
      translationY: this.translate.y,
    });
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

    this.gameStore.updateMap({
      scale: this.scale,
      translationX: this.translate.x,
      translationY: this.translate.y,
    });
    this.applyTransform(false);
  }

  private onWheel = (event: WheelEvent) => {
    const containerBoundingBox =
      this.svgRef?.parentElement?.getBoundingClientRect();
    if (!containerBoundingBox || !this.svgRef) return;

    const zoomSpeed = 0.0015;
    const prevScale = this.scale;
    const delta = -event.deltaY * zoomSpeed;

    this.scale += delta;
    this.scale = Math.max(0.5, Math.min(2, this.scale));
    const zoomingIn = this.scale >= prevScale;
    const zoomFactor = this.scale / prevScale;

    const mouseX = event.clientX - containerBoundingBox.left;
    const mouseY = event.clientY - containerBoundingBox.top;

    if (zoomingIn) {
      this.translate.x -=
        (mouseX - containerBoundingBox.width / 2 - this.translate.x) *
        (zoomFactor - 1);

      this.translate.y -=
        (mouseY - containerBoundingBox.height / 2 - this.translate.y) *
        (zoomFactor - 1);
    } else {
      const recenterFactor = 0.2;
      this.translate.x += (0 - this.translate.x) * recenterFactor;
      this.translate.y += (0 - this.translate.y) * recenterFactor;

      if (this.scale <= 0.5) {
        this.translate.x = 0;
        this.translate.y = 0;
      }
    }

    this.gameStore.updateMap({
      scale: this.scale,
      translationX: this.translate.x,
      translationY: this.translate.y,
    });
    this.applyTransform(true);
  };

  private applyTransform(smooth = false) {
    if (!this.svgRef) return;

    if (smooth) {
      this.svgRef.style.transition = 'transform 0.2s ease-out';
    }
    smooth
      ? (this.svgRef.style.transition = 'transform 0.2s ease-out')
      : (this.svgRef.style.transition = '');

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
      },
    );

    this.elRef.nativeElement.addEventListener(
      'touchstart',
      (e) => this.onTouchStart(e),
      {
        passive: true,
      },
    );

    this.elRef.nativeElement.addEventListener(
      'mousedown',
      (e) => this.onMouseDown(e),
      {
        passive: true,
      },
    );
    this.elRef.nativeElement.addEventListener(
      'mousemove',
      (e) => this.onMouseMove(e),
      {
        passive: true,
      },
    );
  }

  private removeListeners() {
    this.elRef.nativeElement.removeEventListener('wheel', this.onWheel);
    this.elRef.nativeElement.removeEventListener('touchmove', (e) =>
      this.onTouchMove(e),
    );

    this.elRef.nativeElement.removeEventListener('touchstart', (e) =>
      this.onTouchStart(e),
    );

    this.elRef.nativeElement.removeEventListener('mousedown', (e) =>
      this.onMouseDown(e),
    );
    this.elRef.nativeElement.removeEventListener('mousemove', (e) =>
      this.onMouseMove(e),
    );
  }
}
