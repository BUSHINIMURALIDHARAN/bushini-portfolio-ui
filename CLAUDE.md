# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page personal portfolio for Bushini M (Java Full Stack Developer). Angular 20, standalone components, signals, **zoneless** change detection, plain CSS (no UI library, no Tailwind). Deployed to Netlify.

## Commands

```bash
npm ci                 # install from the lockfile
npm start              # ng serve on http://localhost:4200
npm run build          # production build -> dist/bushini-portfolio-ui/browser
npm test               # Karma + Jasmine, watch mode, opens Chrome

# single run, headless (what CI-style checks should use)
npx ng test --watch=false --browsers=ChromeHeadless
# one spec file
npx ng test --watch=false --browsers=ChromeHeadless --include='src/app/components/contact/contact.spec.ts'
```

There is no lint setup (no ESLint). Formatting follows `.editorconfig` (2 spaces, single quotes in TS). `.claude/launch.json` defines a `portfolio` preview server on port 4210.

## Architecture

- **No router.** `@angular/router` is deliberately not wired in (it only added unused JavaScript). Every section is a component rendered in order by `app.html`, and navigation is plain `#id` anchors. A section's element id must match an entry in `NAV_LINKS`; `app.spec.ts` enforces this.
- **`netlify.toml` has no SPA fallback on purpose**, since the site has no client routes. Unknown paths therefore get a real 404 (`public/404.html`), and `/robots.txt` and similar probes are not answered with the HTML shell (that made Lighthouse report an invalid robots.txt). If a router is ever added, restore the `/* -> /index.html` 200 redirect.
- **All content lives in `src/app/data/portfolio.data.ts`** (`PROFILE`, `SOCIALS`, `SKILL_GROUPS`, `EXPERIENCE`, `EDUCATION`, `PROJECTS`, `FOCUS`, `HERO_TECH`, `NAV_LINKS`). Components only render these; change text, links and project cards there, not in templates. `PROFILE.resume` must name a file in `public/` (currently `bushiniResume.pdf`).
- **`ScrollSpy` (`services/scroll-spy.ts`)** is a root service holding `active`, `scrolled` and `progress` signals. `App` starts it once via `afterNextRender`; the navbar (active link, progress bar) and footer (back-to-top) read it. It observes the section elements that exist when it starts, so after a dev-server HMR template swap the active link can go stale until the page is reloaded.
- **Scroll reveal** is the `appReveal` directive (`shared/reveal.ts`): it adds the global `.reveal` class and sets `.in` when the element enters the viewport. The animation is a CSS keyframe with `backwards` fill, not a transition, so `.card:hover` transforms keep working after it finishes. Do not switch it to a transition or a `forwards` fill.
- **3D depth is pure CSS**, driven by two directives that only write custom properties: `appTilt` (`shared/tilt.ts`, cards: `--rx/--ry/--mx/--my`) and `appParallax` (`shared/parallax.ts`, on the hero section: `--px/--py`, plus `--play` to pause the orbit when the hero is off screen). Both ignore touch and `prefers-reduced-motion`. The portrait and the orbiting tech chips (`HERO_TECH`) live in `components/hero-visual`; every ancestor between `.stage` and a chip needs `transform-style: preserve-3d`, and `backdrop-filter`, `overflow` or `opacity` on those ancestors flattens the scene. With reduced motion the chips fall back to static `--sx/--sy` positions.
- **Icons** are inline SVG in `shared/icon/icon.ts`. A new icon needs its name added to the `IconName` union and a matching `@case` in the template.
- **Contact form** (`components/contact`) is a reactive form that `fetch`es the Formspree endpoint in `PROFILE.formEndpoint` and reads a honeypot field named `_gotcha`. It is a real endpoint: stub `window.fetch` when testing instead of submitting.

## Styling

- Design tokens (colours, fonts, radius, `--nav-h`) and the shared utilities (`.btn`, `.chip`, `.card`, `.tile`, `.icon-btn`, `.container`, `.section`, `.reveal`) are in `src/styles.css`. Component CSS only holds layout specific to that component.
- Sections alternate between the plain background and `.section--alt`; a section added or removed means flipping the neighbours so two `--alt` blocks never touch (the footer has no top border because Contact is an `--alt` block). The `01 / ...` index in each section heading is typed by hand.
- The navbar switches to the hamburger menu at 980px, and that number lives in both `navbar.css` and `navbar.ts` (`onResize`). The seven links stop fitting in one row below it.
- `.card.tilt:hover` repeats the tilt transform on purpose: plain `.card:hover` has the same job and would otherwise replace the tilt with a bare `translateY`. Keep the two in step.
- `angular.json` budgets component styles at 4 kB warning / 8 kB error, so put anything shared into `styles.css` instead of repeating it per component.
- Fonts (Inter, Space Grotesk, JetBrains Mono) load from a single Google Fonts link in `src/index.html`. Do not `@import` fonts in component CSS.
- Motion must respect `prefers-reduced-motion` (a global block in `styles.css` handles the blanket case; the typing effect in `home.ts` checks it explicitly).

## Gotchas

- **Zoneless tests:** every spec must provide `provideZonelessChangeDetection()`, otherwise TestBed throws `NG0908: In this configuration Angular requires Zone.js`.
- **Angular template syntax:** a literal `{`, `}` or `@` in a template is parsed as ICU or control flow. The code snippet in the About section is therefore built from data in `about.ts` rather than written inline.
- `public/bushiniResume.pdf` is the **public** résumé: it has no home address, parents' names or religion on purpose. The untrimmed original lives in `private/` (git-ignored, never deployed). Never copy it back into `public/`.
- `public/profile.jpg` and `profile.webp` are pre-resized (960x1280); the hero uses `<picture>` with the WebP first. Replace both when changing the photo.
