import { Component, afterNextRender, inject } from '@angular/core';

import { NAV_LINKS } from './data/portfolio.data';
import { ScrollSpy } from './services/scroll-spy';
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Experience } from './components/experience/experience';
import { Education } from './components/education/education';
import { Projects } from './components/projects/projects';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Navbar, Home, About, Skills, Experience, Education, Projects, Contact, Footer],
  templateUrl: './app.html',
})
export class App {
  private readonly spy = inject(ScrollSpy);

  constructor() {
    afterNextRender(() => this.spy.start(NAV_LINKS.map((link) => link.id)));
  }
}
