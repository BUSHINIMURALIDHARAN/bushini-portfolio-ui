import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

@Directive({
  selector: '[appParallax]',
  host: {
    '(pointermove)': 'move($event)',
    '(pointerleave)': 'rest()',
  },
})
export class Parallax {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);
  private readonly enabled = !matchMedia('(prefers-reduced-motion: reduce)').matches;

  private targetX = 0;
  private targetY = 0;
  private x = 0;
  private y = 0;
  private frame = 0;

  constructor() {
    this.destroyRef.onDestroy(() => cancelAnimationFrame(this.frame));
    afterNextRender(() => this.pauseWhenOffscreen());
  }

  protected move(event: PointerEvent): void {
    if (!this.enabled || event.pointerType !== 'mouse') {
      return;
    }
    const box = this.element.getBoundingClientRect();
    this.targetX = ((event.clientX - box.left) / box.width - 0.5) * 2;
    this.targetY = ((event.clientY - box.top) / box.height - 0.5) * 2;
    this.run();
  }

  protected rest(): void {
    this.targetX = 0;
    this.targetY = 0;
    this.run();
  }

  private run(): void {
    if (this.frame) {
      return;
    }
    const step = () => {
      this.x += (this.targetX - this.x) * 0.08;
      this.y += (this.targetY - this.y) * 0.08;
      this.element.style.setProperty('--px', this.x.toFixed(3));
      this.element.style.setProperty('--py', this.y.toFixed(3));
      const settled = Math.abs(this.targetX - this.x) < 0.002 && Math.abs(this.targetY - this.y) < 0.002;
      this.frame = settled ? 0 : requestAnimationFrame(step);
    };
    this.frame = requestAnimationFrame(step);
  }

  private pauseWhenOffscreen(): void {
    if (!('IntersectionObserver' in window)) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      this.element.style.setProperty('--play', entry.isIntersecting ? 'running' : 'paused');
    });
    observer.observe(this.element);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
