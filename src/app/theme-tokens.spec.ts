const token = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const channels = (hex: string): number[] => [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16) / 255);

const luminance = (hex: string) => {
  const [r, g, b] = channels(hex).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a: string, b: string) => {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
};

const isHex = (value: string) => /^#[0-9a-f]{6}$/i.test(value);

const TEXT_PAIRS: [string, number][] = [
  ['--text', 7],
  ['--muted', 4.5],
  ['--faint', 4.5],
  ['--accent-text', 4.5],
  ['--ok-text', 4.5],
  ['--err-text', 4.5],
  ['--focus', 3],
];

for (const theme of ['dark', 'light']) {
  describe(`${theme} theme tokens`, () => {
    beforeEach(() => {
      document.documentElement.dataset['theme'] = theme;
    });

    afterEach(() => {
      delete document.documentElement.dataset['theme'];
    });

    const surfaces = theme === 'light' ? ['--bg', '--bg-alt', '--card-a'] : ['--bg', '--bg-alt'];

    for (const surface of surfaces) {
      for (const [foreground, minimum] of TEXT_PAIRS) {
        it(`${foreground} on ${surface} is at least ${minimum}:1`, () => {
          const background = token(surface);
          expect(isHex(background)).withContext(`${surface} should be a solid colour`).toBeTrue();
          expect(contrast(token(foreground), background)).toBeGreaterThanOrEqual(minimum);
        });
      }
    }

    it('keeps every heading-gradient stop at least 3:1 on both backgrounds', () => {
      const stops = token('--grad-text').match(/#[0-9a-f]{6}/gi) ?? [];

      expect(stops.length).toBe(3);
      for (const stop of stops) {
        expect(contrast(stop, token('--bg'))).withContext(`${stop} on --bg`).toBeGreaterThanOrEqual(3);
        expect(contrast(stop, token('--bg-alt'))).withContext(`${stop} on --bg-alt`).toBeGreaterThanOrEqual(3);
      }
    });
  });
}
