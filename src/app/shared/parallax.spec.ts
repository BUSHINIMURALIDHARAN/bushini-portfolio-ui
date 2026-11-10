import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Parallax } from './parallax';

@Component({
  imports: [Parallax],
  template: `<div appParallax style="display: block; width: 200px; height: 200px"></div>`,
})
class Host {}

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

describe('Parallax', () => {
  let box: HTMLElement;

  const point = (type: string, pointerType: string, x: number, y: number) =>
    box.dispatchEvent(new PointerEvent(type, { pointerType, clientX: x, clientY: y, bubbles: true }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Host],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    box = (fixture.nativeElement as HTMLElement).querySelector('div')!;
  });

  it('eases --px and --py towards the mouse position', async () => {
    const rect = box.getBoundingClientRect();

    point('pointermove', 'mouse', rect.right, rect.top);
    await wait(300);

    expect(parseFloat(box.style.getPropertyValue('--px'))).toBeGreaterThan(0.2);
    expect(parseFloat(box.style.getPropertyValue('--py'))).toBeLessThan(-0.2);
  });

  it('ignores touch input', async () => {
    const rect = box.getBoundingClientRect();

    point('pointermove', 'touch', rect.right, rect.bottom);
    await wait(100);

    expect(box.style.getPropertyValue('--px')).toBe('');
  });
});
