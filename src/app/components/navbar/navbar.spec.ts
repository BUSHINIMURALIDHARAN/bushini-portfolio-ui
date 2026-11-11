import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let root: HTMLElement;

  beforeEach(async () => {
    localStorage.removeItem('theme');
    document.documentElement.dataset['theme'] = 'dark';

    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideZonelessChangeDetection()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('theme');
    delete document.documentElement.dataset['theme'];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('offers light mode while the page is dark', () => {
    const toggle = root.querySelector<HTMLButtonElement>('.theme-toggle')!;

    expect(toggle.getAttribute('aria-label')).toBe('Switch to light mode');
  });

  it('flips the page theme and the button label when clicked', async () => {
    const toggle = root.querySelector<HTMLButtonElement>('.theme-toggle')!;

    toggle.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(document.documentElement.dataset['theme']).toBe('light');
    expect(toggle.getAttribute('aria-label')).toBe('Switch to dark mode');
  });
});
