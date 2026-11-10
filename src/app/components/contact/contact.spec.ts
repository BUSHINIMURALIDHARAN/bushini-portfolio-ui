import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contact } from './contact';

describe('Contact', () => {
  let fixture: ComponentFixture<Contact>;
  let root: HTMLElement;

  const fill = (selector: string, value: string) => {
    const input = root.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector)!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  };

  const submit = async () => {
    root.querySelector<HTMLButtonElement>('button[type=submit]')!.click();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows an error for every empty field and sends nothing', async () => {
    const send = spyOn(window, 'fetch');

    await submit();

    expect(root.querySelectorAll('.err').length).toBe(3);
    expect(send).not.toHaveBeenCalled();
  });

  it('posts the message to the form service and confirms it', async () => {
    const send = spyOn(window, 'fetch').and.resolveTo(new Response('{}', { status: 200 }));
    fill('#contact-name', 'Test Visitor');
    fill('#contact-email', 'visitor@example.com');
    fill('#contact-message', 'Hello, this is a test message.');

    await submit();

    expect(send).toHaveBeenCalledTimes(1);
    const [url, init] = send.calls.mostRecent().args as [string, RequestInit];
    expect(url).toContain('formspree.io');
    expect((init.body as FormData).get('email')).toBe('visitor@example.com');
    expect(root.querySelector('.note.ok')).not.toBeNull();
  });

  it('offers the email address when the form service fails', async () => {
    spyOn(window, 'fetch').and.rejectWith(new TypeError('offline'));
    fill('#contact-name', 'Test Visitor');
    fill('#contact-email', 'visitor@example.com');
    fill('#contact-message', 'Hello, this is a test message.');

    await submit();

    expect(root.querySelector('.note.bad a[href^="mailto:"]')).not.toBeNull();
  });
});
