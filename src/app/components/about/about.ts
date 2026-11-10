import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FOCUS } from '../../data/portfolio.data';
import { Icon } from '../../shared/icon/icon';
import { Reveal } from '../../shared/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { Tilt } from '../../shared/tilt';

type Kind = 'k' | 'n' | 's' | 'p';
type Token = [kind: Kind, text: string];

interface CodeLine {
  indent: number;
  tokens: Token[];
}

@Component({
  selector: 'app-about',
  imports: [Icon, Reveal, SectionHeading, Tilt],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly focus = FOCUS;

  protected readonly code: CodeLine[] = [
    { indent: 0, tokens: [['k', 'const '], ['n', 'bushini '], ['p', '= {']] },
    { indent: 1, tokens: [['n', 'role'], ['p', ': '], ['s', "'Java Full Stack Developer'"], ['p', ',']] },
    { indent: 1, tokens: [['n', 'company'], ['p', ': '], ['s', "'Paragon Dynamics'"], ['p', ',']] },
    { indent: 1, tokens: [['n', 'domain'], ['p', ': '], ['s', "'Shipping and Logistics'"], ['p', ',']] },
    {
      indent: 1,
      tokens: [
        ['n', 'stack'],
        ['p', ': ['],
        ['s', "'Java'"],
        ['p', ', '],
        ['s', "'Spring Boot'"],
        ['p', ', '],
      ],
    },
    { indent: 2, tokens: [['s', "'Angular'"], ['p', ', '], ['s', "'PostgreSQL'"], ['p', '],']] },
    { indent: 1, tokens: [['n', 'cares'], ['p', ': '], ['s', "'clean APIs, reliable data'"], ['p', ',']] },
    { indent: 0, tokens: [['p', '};']] },
  ];
}
