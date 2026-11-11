import { EDUCATION, NAV_LINKS, PROJECTS, SKILL_GROUPS, experienceYears } from './portfolio.data';

describe('portfolio data', () => {
  it('counts experience in half-year steps from May 2025', () => {
    expect(experienceYears(new Date(2025, 11, 1))).toBe('1+');
    expect(experienceYears(new Date(2026, 10, 10))).toBe('1.5+');
    expect(experienceYears(new Date(2027, 4, 1))).toBe('2+');
  });

  it('keeps navigation ids unique', () => {
    const ids = NAV_LINKS.map((link) => link.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every project a summary, a stack and https links only', () => {
    for (const project of PROJECTS) {
      expect(project.summary.length).withContext(project.title).toBeGreaterThan(20);
      expect(project.stack.length).withContext(project.title).toBeGreaterThan(0);
      for (const link of project.links) {
        expect(link.href.startsWith('https://')).withContext(link.href).toBeTrue();
      }
    }
  });

  it('describes every project screenshot so it can be sized, read and matched to its live link', () => {
    for (const project of PROJECTS) {
      const image = project.image;
      if (!image) {
        continue;
      }
      for (const shot of [image, ...(image.phone ? [image.phone] : [])]) {
        expect(shot.src).withContext(shot.src).toMatch(/^[\w-]+\.webp$/);
        expect(shot.alt.length).withContext(shot.src).toBeGreaterThan(10);
        expect(shot.width).withContext(shot.src).toBeGreaterThan(0);
        expect(shot.height).withContext(shot.src).toBeGreaterThan(0);
      }
      expect(image.srcset).withContext(project.title).toContain(`${image.src} ${image.width}w`);

      const live = project.links.find((link) => link.label === 'Live site');
      expect(live).withContext(project.title).toBeDefined();
      expect(new URL(live?.href ?? '').host).withContext(project.title).toBe(image.host);
    }
  });

  it('points every project screenshot at a file that is actually served', async () => {
    const urls = new Set<string>();
    for (const project of PROJECTS) {
      for (const shot of project.image ? [project.image, ...(project.image.phone ? [project.image.phone] : [])] : []) {
        urls.add(shot.src);
      }
      for (const candidate of project.image?.srcset.split(',') ?? []) {
        urls.add(candidate.trim().split(' ')[0]);
      }
    }

    expect(urls.size).toBeGreaterThan(0);
    for (const url of urls) {
      const response = await fetch(url);
      expect(response.ok).withContext(url).toBeTrue();
    }
  });

  it('lists education newest first with a four-digit year and exactly one featured entry', () => {
    const years = EDUCATION.map((item) => item.year);

    for (const year of years) {
      expect(year).toMatch(/^\d{4}$/);
    }
    expect([...years].sort().reverse()).toEqual(years);
    expect(EDUCATION.filter((item) => item.featured).length).toBe(1);
  });

  it('lists skills without duplicates inside a group', () => {
    for (const group of SKILL_GROUPS) {
      expect(new Set(group.items).size).withContext(group.title).toBe(group.items.length);
    }
  });
});
