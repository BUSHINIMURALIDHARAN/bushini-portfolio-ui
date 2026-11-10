import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EDUCATION } from '../../data/portfolio.data';
import { Icon } from '../../shared/icon/icon';
import { Reveal } from '../../shared/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { Tilt } from '../../shared/tilt';

@Component({
  selector: 'app-education',
  imports: [Icon, Reveal, SectionHeading, Tilt],
  templateUrl: './education.html',
  styleUrl: './education.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Education {
  protected readonly items = EDUCATION;
}
