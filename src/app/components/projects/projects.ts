import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PROJECTS } from '../../data/portfolio.data';
import { Icon } from '../../shared/icon/icon';
import { Reveal } from '../../shared/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { Tilt } from '../../shared/tilt';

@Component({
  selector: 'app-projects',
  imports: [Icon, Reveal, SectionHeading, Tilt],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly projects = PROJECTS;
}
