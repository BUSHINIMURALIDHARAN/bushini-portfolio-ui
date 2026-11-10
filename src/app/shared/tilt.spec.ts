import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Tilt } from './tilt';

@Component({
  imports: [Tilt],
  template: `<div appTilt="10" style="display: block; width: 200px; height: 100px"></div>`,
})
class Host {}

const frames = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

describe('Tilt', () => {
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

  it('marks the host with the tilt class', () => {
    expect(box.classList).toContain('tilt');
  });

  it('leans towards the mouse, up to the configured angle', async () => {
    const rect = box.getBoundingClientRect();

    point('pointermove', 'mouse', rect.right - 1, rect.top + rect.height / 2);
    await frames();

    const ry = parseFloat(box.style.getPropertyValue('--ry'));
    expect(ry).toBeGreaterThan(8);
    expect(ry).toBeLessThanOrEqual(10);
    expect(parseFloat(box.style.getPropertyValue('--rx'))).toBeCloseTo(0, 0);
  });

  it('ignores touch input', async () => {
    const rect = box.getBoundingClientRect();

    point('pointermove', 'touch', rect.right - 1, rect.top + 1);
    await frames();

    expect(box.style.getPropertyValue('--ry')).toBe('');
  });

  it('settles back when the pointer leaves', async () => {
    const rect = box.getBoundingClientRect();
    point('pointermove', 'mouse', rect.right - 1, rect.bottom - 1);
    await frames();

    point('pointerleave', 'mouse', rect.right + 50, rect.bottom + 50);

    expect(box.style.getPropertyValue('--ry')).toBe('');
    expect(box.style.getPropertyValue('--rx')).toBe('');
  });
});
