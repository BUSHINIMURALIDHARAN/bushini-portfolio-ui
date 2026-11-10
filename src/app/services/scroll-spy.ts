import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollSpy {
  readonly active = signal('home');
  readonly scrolled = signal(false);
  readonly progress = signal(0);

  private started = false;

  start(ids: readonly string[]): void {
    if (this.started || typeof window === 'undefined') {
      return;
    }
    this.started = true;

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.active.set(entry.target.id);
            }
          }
        },
        { rootMargin: '-40% 0px -55% 0px' },
      );
      sections.forEach((section) => observer.observe(section));
    }

    let queued = false;
    const update = () => {
      queued = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      this.scrolled.set(y > 24);
      this.progress.set(max > 0 ? Math.min(1, y / max) : 0);
      if (max > 0 && max - y < 4) {
        this.active.set(ids[ids.length - 1]);
      }
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!queued) {
          queued = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true },
    );

    if ('requestIdleCallback' in window) {
      requestIdleCallback(update);
    } else {
      setTimeout(update, 200);
    }
  }
}
