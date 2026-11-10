import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HERO_TECH } from '../../data/portfolio.data';
import { HeroVisual } from './hero-visual';

describe('HeroVisual', () => {
  let fixture: ComponentFixture<HeroVisual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroVisual],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroVisual);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('orbits one chip per technology and keeps the orbit out of the accessibility tree', () => {
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelectorAll('.chip').length).toBe(HERO_TECH.length);
    expect(root.querySelector('.ring')?.getAttribute('aria-hidden')).toBe('true');
    expect(root.querySelector('img')?.getAttribute('alt')).toContain('Bushini');
  });
});
