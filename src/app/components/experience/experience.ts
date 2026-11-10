import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EXPERIENCE } from '../../data/portfolio.data';
import { Icon } from '../../shared/icon/icon';
import { Reveal } from '../../shared/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-experience',
  imports: [Icon, Reveal, SectionHeading],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  protected readonly jobs = EXPERIENCE;
}
