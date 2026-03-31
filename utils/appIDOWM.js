export function appIdOpenWeather({
  appId = process.env.appid,
  extra = {}
} = {}) {
  if (!appId) throw new Error('App ID is missing. Set appid in environment or pass it explicitly.');
  return { ...extra, appid: appId };
}

//query parameter for lat, lon, and appid https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}

export function appIdQuery(url, {
  appId = process.env.appid,
  lat= process.env.lat,
  lon= process.env.lon
} = {}) {
  if (!appId) throw new Error('App ID is missing. Set appid in environment or pass it explicitly.');
  const hasQ = url.includes('?');
  const sep = hasQ ? '&' : '?';
  return `${url}${sep}lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${encodeURIComponent(appId)}`;
}
