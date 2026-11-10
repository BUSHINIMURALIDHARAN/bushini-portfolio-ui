import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HERO_TECH } from '../../data/portfolio.data';

@Component({
  selector: 'app-hero-visual',
  templateUrl: './hero-visual.html',
  styleUrl: './hero-visual.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroVisual {
  protected readonly tech = HERO_TECH;
}
