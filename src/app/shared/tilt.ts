import { DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';

const clamp = (value: number) => Math.max(-1, Math.min(1, value));

@Directive({
  selector: '[appTilt]',
  host: {
    class: 'tilt',
    '(pointermove)': 'move($event)',
    '(pointerleave)': 'rest()',
  },
})
export class Tilt {
  readonly max = input(6, {
    alias: 'appTilt',
    transform: (value: number | string) => Number(value) || 6,
  });

  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly enabled = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  private frame = 0;

  constructor() {
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.frame));
  }

  protected move(event: PointerEvent): void {
    if (!this.enabled || event.pointerType !== 'mouse') {
      return;
    }
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const box = this.element.getBoundingClientRect();
      const x = clamp((event.clientX - (box.left + box.width / 2)) / (this.element.offsetWidth / 2));
      const y = clamp((event.clientY - (box.top + box.height / 2)) / (this.element.offsetHeight / 2));
      const style = this.element.style;
      style.setProperty('--rx', `${-y * this.max()}deg`);
      style.setProperty('--ry', `${x * this.max()}deg`);
      style.setProperty('--mx', `${50 + x * 50}%`);
      style.setProperty('--my', `${50 + y * 50}%`);
    });
  }

  protected rest(): void {
    cancelAnimationFrame(this.frame);
    this.element.style.removeProperty('--rx');
    this.element.style.removeProperty('--ry');
  }
}
