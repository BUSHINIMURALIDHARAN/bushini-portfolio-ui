import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { NAV_LINKS, PROFILE } from '../../data/portfolio.data';
import { ScrollSpy } from '../../services/scroll-spy';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-navbar',
  imports: [Icon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'close()',
    '(window:resize)': 'onResize()',
  },
})
export class Navbar {
  protected readonly spy = inject(ScrollSpy);
  protected readonly links = NAV_LINKS;
  protected readonly profile = PROFILE;
  protected readonly open = signal(false);

  protected toggle(): void {
    this.open.update((value) => !value);
  }

  protected close(): void {
    this.open.set(false);
  }

  protected onResize(): void {
    if (window.innerWidth > 980) {
      this.close();
    }
  }
}
