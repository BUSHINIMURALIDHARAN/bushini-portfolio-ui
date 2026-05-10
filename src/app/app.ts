import { Component } from '@angular/core';

import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { Experience } from './components/experience/experience';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    Navbar,
    Home,
    About,
    Skills,
    Projects,
    Contact,
    Footer,
    Experience
  ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {

}