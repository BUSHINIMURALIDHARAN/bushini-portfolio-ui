import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SKILL_GROUPS } from '../../data/portfolio.data';
import { Icon } from '../../shared/icon/icon';
import { Reveal } from '../../shared/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { Tilt } from '../../shared/tilt';

@Component({
  selector: 'app-skills',
  imports: [Icon, Reveal, SectionHeading, Tilt],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;
}
