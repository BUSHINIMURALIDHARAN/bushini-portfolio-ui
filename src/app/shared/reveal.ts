import { Directive, ElementRef, afterNextRender, inject, input, signal } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.in]': 'shown()',
    '[style.--reveal-delay]': 'delay() + "ms"',
  },
})
export class Reveal {
  readonly delay = input(0, {
    alias: 'appReveal',
    transform: (value: number | string) => Number(value) || 0,
  });

  protected readonly shown = signal(false);

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

    afterNextRender(() => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || !('IntersectionObserver' in window)) {
        this.shown.set(true);
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            this.shown.set(true);
            observer.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
      );
      observer.observe(element);
    });
  }
}
