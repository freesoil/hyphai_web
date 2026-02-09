const EXTERNAL_PREFIXES = ['http://', 'https://', 'data:', 'blob:'];

export const resolveAssetUrl = (url: string): string => {
  if (!url) {
    return url;
  }

  if (EXTERNAL_PREFIXES.some(prefix => url.startsWith(prefix))) {
    return url;
  }

  const baseUrl = import.meta.env.BASE_URL || '/';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const normalizedUrl = url.startsWith('/') ? url.slice(1) : url;

  return `${normalizedBase}${normalizedUrl}`;
};
