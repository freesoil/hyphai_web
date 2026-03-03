/**
 * Hash routing helpers. Single source for route segments and parse/build logic.
 */

export type View =
  | 'home'
  | 'solutions'
  | 'pilot'
  | 'who-we-serve'
  | 'how-we-work'
  | 'about'
  | 'contact'
  | 'guide'
  | 'service'
  | 'safety'
  | 'privacy'
  | 'catalog'
  | 'machineDetail'
  | 'brochure';

export type RouteState = { view: View; machineSlug?: string };

export function parseHashRoute(hash: string): RouteState {
  const rawPath = hash.startsWith('#') ? hash.slice(1) : hash;
  const path = rawPath || '/';
  const segments = path.replace(/^\//, '').split('/').filter(Boolean);

  if (segments.length === 0) return { view: 'home' };
  if (segments[0] === 'machine' && segments[1]) {
    return { view: 'machineDetail', machineSlug: decodeURIComponent(segments[1]) };
  }

  switch (segments[0]) {
    case 'solutions':
      return { view: 'solutions' };
    case 'pilot':
      return { view: 'pilot' };
    case 'who-we-serve':
      return { view: 'who-we-serve' };
    case 'how-we-work':
      return { view: 'how-we-work' };
    case 'about':
      return { view: 'about' };
    case 'contact':
      return { view: 'contact' };
    case 'catalog':
      return { view: 'catalog' };
    case 'guide':
      return { view: 'guide' };
    case 'service':
      return { view: 'service' };
    case 'safety':
      return { view: 'safety' };
    case 'privacy':
      return { view: 'privacy' };
    case 'brochure':
      return { view: 'brochure' };
    default:
      return { view: 'home' };
  }
}

export function buildHash(route: RouteState): string {
  if (route.view === 'machineDetail' && route.machineSlug) {
    return `#/machine/${encodeURIComponent(route.machineSlug)}`;
  }

  switch (route.view) {
    case 'solutions':
      return '#/solutions';
    case 'pilot':
      return '#/pilot';
    case 'who-we-serve':
      return '#/who-we-serve';
    case 'how-we-work':
      return '#/how-we-work';
    case 'about':
      return '#/about';
    case 'contact':
      return '#/contact';
    case 'catalog':
      return '#/catalog';
    case 'guide':
      return '#/guide';
    case 'service':
      return '#/service';
    case 'safety':
      return '#/safety';
    case 'privacy':
      return '#/privacy';
    case 'brochure':
      return '#/brochure';
    case 'home':
    default:
      return '#/';
  }
}
