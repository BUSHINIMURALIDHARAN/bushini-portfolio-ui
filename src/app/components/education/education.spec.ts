import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EDUCATION } from '../../data/portfolio.data';
import { Education } from './education';

describe('Education', () => {
  let fixture: ComponentFixture<Education>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Education],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Education);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows every qualification with its school and score', () => {
    const root = fixture.nativeElement as HTMLElement;
    const text = root.textContent ?? '';

    expect(root.querySelectorAll('article').length).toBe(EDUCATION.length);
    for (const item of EDUCATION) {
      expect(text).withContext(item.title).toContain(item.school);
      expect(text).withContext(item.title).toContain(item.score);
    }
  });
});
