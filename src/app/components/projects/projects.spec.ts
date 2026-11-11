import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projects } from './projects';

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [provideZonelessChangeDetection()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the featured project in a browser frame with both screenshots', () => {
    const root: HTMLElement = fixture.nativeElement;
    const card = root.querySelector('article.featured');
    const images = Array.from(root.querySelectorAll<HTMLImageElement>('article.featured figure.media img'));

    expect(card?.classList.contains('has-media')).toBeTrue();
    expect(images.length).toBe(2);
    for (const image of images) {
      expect(image.alt.length).withContext(image.getAttribute('src') ?? '').toBeGreaterThan(10);
      expect(image.getAttribute('loading')).toBe('lazy');
      expect(Number(image.getAttribute('width'))).toBeGreaterThan(0);
      expect(Number(image.getAttribute('height'))).toBeGreaterThan(0);
    }
    expect(root.querySelector('figure.media .bar')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('leaves cards without a screenshot as plain cards', () => {
    const plain = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('article.project:not(.featured)'));

    expect(plain.length).toBeGreaterThan(0);
    for (const card of plain) {
      expect(card.querySelector('figure')).toBeNull();
    }
  });
});
