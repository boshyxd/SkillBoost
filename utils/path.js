export function getApiUrl(path) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  return `${baseUrl}/api${path}`;
}

export function getPageUrl(path) {
  return path;
} 