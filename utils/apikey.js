export function apiKeyHeader({
  keyValue = process.env.API_KEY,
  keyName = process.env.API_KEY_HEADER,
  extra = {}
}) {
  if (!keyValue) throw new Error('API key is missing. Set API_KEY in environment or pass key explicitly.');
  return { ...extra, [keyName]: keyValue };
}

export function apiKeyQuery(url, {
  keyValue = process.env.API_KEY,
  queryName = process.env.API_KEY_QUERY
} = {}) {
  if (!keyValue) throw new Error('API key is missing. Set API_KEY in environment or pass key explicitly.');
  const hasQ = url.includes('?');
  const sep = hasQ ? '&' : '?';
  return `${url}${sep}${encodeURIComponent(queryName)}=${encodeURIComponent(keyValue)}`;
}