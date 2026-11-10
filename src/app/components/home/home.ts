import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';

import { PROFILE, SOCIALS, experienceYears } from '../../data/portfolio.data';
import { Icon } from '../../shared/icon/icon';
import { Parallax } from '../../shared/parallax';
import { HeroVisual } from '../hero-visual/hero-visual';

@Component({
  selector: 'app-home',
  imports: [Icon, HeroVisual, Parallax],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly profile = PROFILE;
  protected readonly socials = SOCIALS;
  protected readonly stats = [
    { value: experienceYears(), label: 'Years in enterprise software' },
    { value: 'ERP', label: 'Shipping and logistics domain' },
    { value: 'Full stack', label: 'Java, Angular, PostgreSQL' },
  ];
  protected readonly typed = signal(PROFILE.typedRoles[0]);

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.type();
      }
    });
  }

  private type(): void {
    const roles = PROFILE.typedRoles;
    let index = 0;
    let length = roles[0].length;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const role = roles[index];
      if (!deleting && length < role.length) {
        length++;
        timer = setTimeout(tick, 55);
      } else if (!deleting) {
        deleting = true;
        timer = setTimeout(tick, 2200);
      } else if (length > 0) {
        length--;
        timer = setTimeout(tick, 28);
      } else {
        deleting = false;
        index = (index + 1) % roles.length;
        timer = setTimeout(tick, 350);
      }
      this.typed.set(roles[index].slice(0, length));
    };

    timer = setTimeout(tick, 2200);
    this.destroyRef.onDestroy(() => clearTimeout(timer));
  }
}
