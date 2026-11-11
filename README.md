# Bushini M | Portfolio

Live: https://bushini-m.netlify.app

Personal portfolio for Bushini M, a Java Full Stack Developer. Built with Angular 20 (standalone components, signals, zoneless change detection) and plain CSS, with no UI library.

## Sections

Hero, About, Skills, Experience, Education, Projects and Contact, with a sticky navbar that tracks the section in view, a scroll progress bar, reveal-on-scroll animations and a contact form that posts to Formspree.

The 3D effects are plain CSS transforms (no WebGL or extra libraries): the hero portrait tilts with the mouse while tech chips orbit it, and the cards lean towards the pointer with a soft glare. All motion is switched off for `prefers-reduced-motion` and ignored on touch screens.

There is a light and a dark theme. The site follows the visitor's system setting, and the sun/moon button in the navbar switches it and remembers the choice. Dark is the original midnight navy.

## Run it

```bash
npm ci
npm start          # http://localhost:4200
npm run build      # output in dist/bushini-portfolio-ui/browser
npm test           # Karma + Jasmine; use `-- --watch=false --browsers=ChromeHeadless` for a single run
```

## Editing content

All text, links and project cards live in one file: [`src/app/data/portfolio.data.ts`](src/app/data/portfolio.data.ts). Change a skill, job, project or contact detail there and every section updates.

| To change | Edit |
| --- | --- |
| Name, summary, contact details, résumé file | `PROFILE` |
| Social links | `SOCIALS` |
| Skill groups | `SKILL_GROUPS` |
| Job history | `EXPERIENCE` |
| Qualifications (newest first, one `featured`) | `EDUCATION` |
| Project cards (set `featured` for the wide card) | `PROJECTS` |

Colours, fonts and spacing are CSS variables at the top of [`src/styles.css`](src/styles.css), with one block for the dark theme and one for the light theme.

Assets are in `public/`: `profile.jpg` and `profile.webp` (portrait), `bushiniResume.pdf` (the file the Résumé buttons download), and the favicon set.

## Structure

```text
src/app/
  data/            portfolio content (single source of truth)
  services/        scroll-spy.ts: active section, scroll progress
  shared/          icon, section-heading, reveal directive
  components/      navbar, home, about, skills, experience, projects, contact, footer
```

## Deploy

Netlify builds with `npm run build` on Node 22 and publishes `dist/bushini-portfolio-ui/browser` (see `netlify.toml`). The site is a single page with no client routes, so unknown URLs return `404.html`. `netlify.toml` also sets long-lived caching for the hashed JS and CSS files and a few security headers.
