import { describe, it, expect } from 'vitest';
import { parseHashRoute, buildHash } from './routes';

describe('parseHashRoute', () => {
  it('returns home for empty or root hash', () => {
    expect(parseHashRoute('')).toEqual({ view: 'home' });
    expect(parseHashRoute('#')).toEqual({ view: 'home' });
    expect(parseHashRoute('#/')).toEqual({ view: 'home' });
  });

  it('parses all new redesign routes', () => {
    expect(parseHashRoute('#/solutions')).toEqual({ view: 'solutions' });
    expect(parseHashRoute('#/pilot')).toEqual({ view: 'pilot' });
    expect(parseHashRoute('#/who-we-serve')).toEqual({ view: 'who-we-serve' });
    expect(parseHashRoute('#/how-we-work')).toEqual({ view: 'how-we-work' });
    expect(parseHashRoute('#/about')).toEqual({ view: 'about' });
    expect(parseHashRoute('#/contact')).toEqual({ view: 'contact' });
  });

  it('parses legacy routes', () => {
    expect(parseHashRoute('#/catalog')).toEqual({ view: 'catalog' });
    expect(parseHashRoute('#/guide')).toEqual({ view: 'guide' });
    expect(parseHashRoute('#/service')).toEqual({ view: 'service' });
    expect(parseHashRoute('#/safety')).toEqual({ view: 'safety' });
    expect(parseHashRoute('#/privacy')).toEqual({ view: 'privacy' });
    expect(parseHashRoute('#/brochure')).toEqual({ view: 'brochure' });
  });

  it('parses machine detail with slug', () => {
    expect(parseHashRoute('#/machine/self-propelled-transplanter-2zbz-1-2zbz-2')).toEqual({
      view: 'machineDetail',
      machineSlug: 'self-propelled-transplanter-2zbz-1-2zbz-2',
    });
  });

  it('returns home for unknown segment', () => {
    expect(parseHashRoute('#/unknown')).toEqual({ view: 'home' });
  });
});

describe('buildHash', () => {
  it('builds home hash', () => {
    expect(buildHash({ view: 'home' })).toBe('#/');
  });

  it('builds all page hashes', () => {
    expect(buildHash({ view: 'solutions' })).toBe('#/solutions');
    expect(buildHash({ view: 'pilot' })).toBe('#/pilot');
    expect(buildHash({ view: 'contact' })).toBe('#/contact');
    expect(buildHash({ view: 'catalog' })).toBe('#/catalog');
  });

  it('builds machine detail hash with slug', () => {
    expect(buildHash({ view: 'machineDetail', machineSlug: 'my-machine' })).toBe(
      '#/machine/my-machine'
    );
    expect(buildHash({ view: 'machineDetail', machineSlug: 'slug-with spaces' })).toBe(
      '#/machine/slug-with%20spaces'
    );
  });
});

describe('round-trip', () => {
  it('parse then build preserves route', () => {
    const hashes = ['#/', '#/solutions', '#/contact', '#/catalog', '#/machine/some-slug'];
    for (const h of hashes) {
      const state = parseHashRoute(h);
      const built = buildHash(state);
      const again = parseHashRoute(built);
      expect(again).toEqual(state);
    }
  });
});
