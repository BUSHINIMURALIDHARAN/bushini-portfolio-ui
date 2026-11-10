import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Reveal } from '../reveal';

@Component({
  selector: 'app-section-heading',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header appReveal>
      <p class="eyebrow">{{ index() }} / {{ label() }}</p>
      <h2 [id]="titleId()">{{ title() }}</h2>
      @if (lead()) {
        <p class="lead">{{ lead() }}</p>
      }
    </header>
  `,
  styles: `
    :host {
      display: block;
    }

    .eyebrow {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: var(--accent);
      font: 500 0.8rem/1 var(--font-mono);
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .eyebrow::after {
      content: '';
      width: 56px;
      height: 1px;
      background: var(--line-hi);
    }

    h2 {
      margin-top: 18px;
      max-width: 22ch;
      font-size: clamp(1.9rem, 4.2vw, 2.9rem);
      font-weight: 700;
    }

    .lead {
      max-width: 58ch;
      margin-top: 16px;
      color: var(--muted);
      font-size: 1.05rem;
    }
  `,
})
export class SectionHeading {
  readonly index = input.required<string>();
  readonly label = input.required<string>();
  readonly title = input.required<string>();
  readonly titleId = input.required<string>();
  readonly lead = input('');
}
