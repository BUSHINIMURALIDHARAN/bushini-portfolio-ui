import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { PROFILE, SOCIALS } from '../../data/portfolio.data';
import { Icon } from '../../shared/icon/icon';
import { Reveal } from '../../shared/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';

type Field = 'name' | 'email' | 'message';
type SendState = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Icon, Reveal, SectionHeading],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly profile = PROFILE;
  protected readonly socials = SOCIALS.filter((social) => social.icon !== 'mail');
  protected readonly state = signal<SendState>('idle');

  private readonly submitted = signal(false);

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected invalid(field: Field): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.submitted());
  }

  protected async send(trap: string): Promise<void> {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const body = new FormData();
    for (const [key, value] of Object.entries(this.form.getRawValue())) {
      body.append(key, value);
    }
    body.append('_gotcha', trap);

    this.state.set('sending');
    try {
      const response = await fetch(PROFILE.formEndpoint, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Form service answered ${response.status}`);
      }
      this.form.reset();
      this.submitted.set(false);
      this.state.set('sent');
    } catch {
      this.state.set('error');
    }
  }
}
