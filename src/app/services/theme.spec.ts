import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme';

type SystemListener = (event: { matches: boolean }) => void;

describe('ThemeService', () => {
  let meta: HTMLMetaElement;
  let systemListeners: SystemListener[];

  const pretendSystemIsDark = (dark: boolean) => {
    spyOn(window, 'matchMedia').and.callFake(
      (query: string) =>
        ({
          matches: query.includes('color-scheme: dark') ? dark : query.includes('color-scheme: light') ? !dark : false,
          media: query,
          addEventListener: (_type: string, listener: SystemListener) => {
            if (query.includes('color-scheme: dark')) {
              systemListeners.push(listener);
            }
          },
          removeEventListener: () => undefined,
        }) as unknown as MediaQueryList,
    );
  };

  const create = () => {
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
    return TestBed.inject(ThemeService);
  };

  beforeEach(() => {
    systemListeners = [];
    localStorage.removeItem('theme');
    delete document.documentElement.dataset['theme'];
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = '#0a0d14';
    document.head.appendChild(meta);
  });

  afterEach(() => {
    meta.remove();
    localStorage.removeItem('theme');
    delete document.documentElement.dataset['theme'];
    document.documentElement.classList.remove('theme-anim');
  });

  it('follows the system when nothing is stored', () => {
    pretendSystemIsDark(false);

    expect(create().theme()).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');
  });

  it('keeps the theme the page script already chose', () => {
    pretendSystemIsDark(true);
    document.documentElement.dataset['theme'] = 'light';

    expect(create().theme()).toBe('light');
  });

  it('prefers a stored choice over the system', () => {
    pretendSystemIsDark(false);
    localStorage.setItem('theme', 'dark');

    expect(create().theme()).toBe('dark');
  });

  it('toggles, remembers the choice and updates the browser colour', () => {
    pretendSystemIsDark(true);
    const service = create();

    service.toggle();

    expect(service.theme()).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(meta.content).toBe('#f7f8fb');

    service.toggle();

    expect(service.theme()).toBe('dark');
    expect(meta.content).toBe('#0a0d14');
  });

  it('follows system changes until the visitor picks a theme', () => {
    pretendSystemIsDark(true);
    const service = create();

    systemListeners.forEach((listener) => listener({ matches: false }));
    expect(service.theme()).toBe('light');

    service.toggle();
    expect(service.theme()).toBe('dark');

    systemListeners.forEach((listener) => listener({ matches: false }));
    expect(service.theme()).toBe('dark');
  });
});
