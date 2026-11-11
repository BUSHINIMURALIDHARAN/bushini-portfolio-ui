import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const BROWSER_COLOUR: Record<Theme, string> = { dark: '#0a0d14', light: '#f7f8fb' };

const isTheme = (value: unknown): value is Theme => value === 'light' || value === 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private chosen = this.stored() !== null;

  readonly theme = signal<Theme>(this.initial());

  constructor() {
    this.apply(this.theme());
    this.document.defaultView
      ?.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        if (!this.chosen) {
          this.set(event.matches ? 'dark' : 'light');
        }
      });
  }

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.chosen = true;
    this.save(next);
    this.fade();
    this.set(next);
  }

  private set(theme: Theme): void {
    this.theme.set(theme);
    this.apply(theme);
  }

  private apply(theme: Theme): void {
    this.document.documentElement.dataset['theme'] = theme;
    this.document.querySelector('meta[name="theme-color"]')?.setAttribute('content', BROWSER_COLOUR[theme]);
  }

  private initial(): Theme {
    const applied = this.document.documentElement.dataset['theme'];
    if (isTheme(applied)) {
      return applied;
    }
    const stored = this.stored();
    if (stored) {
      return stored;
    }
    return this.document.defaultView?.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  private stored(): Theme | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return isTheme(value) ? value : null;
    } catch {
      return null;
    }
  }

  private save(theme: Theme): void {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      return;
    }
  }

  private fade(): void {
    const view = this.document.defaultView;
    if (!view || view.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const root = this.document.documentElement;
    root.classList.add('theme-anim');
    setTimeout(() => root.classList.remove('theme-anim'), 400);
  }
}
