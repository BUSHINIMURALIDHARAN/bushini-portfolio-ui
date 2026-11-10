import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NAV_LINKS, PROFILE, SOCIALS } from '../../data/portfolio.data';
import { ScrollSpy } from '../../services/scroll-spy';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-footer',
  imports: [Icon],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly spy = inject(ScrollSpy);
  protected readonly profile = PROFILE;
  protected readonly links = NAV_LINKS;
  protected readonly socials = SOCIALS;
  protected readonly year = new Date().getFullYear();
}
