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
