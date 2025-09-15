export const FETCH_WEATHER = 'FETCH_WEATHER';
export const REMOVE_WEATHER = 'REMOVE_WEATHER';
export const CLEAR_WEATHER = 'CLEAR_WEATHER';
const units = 'imperial';

export function parseQuery(raw) {
  const input = (raw || '').trim();
  const zipOnly = input.match(/^\d{5}$/);
  const zipWithCountry = input.match(/^(\d{5}),\s*([A-Za-z]{2})$/);
  const usCityStateMatch = input.match(/^([^,]+),\s*([A-Za-z]{2})$/);
  if (zipOnly) return { zip: `${input},US` };
  if (zipWithCountry) return { zip: `${zipWithCountry[1]},${zipWithCountry[2].toUpperCase()}` };
  if (usCityStateMatch) {
    const city = usCityStateMatch[1].trim();
    const state = usCityStateMatch[2].toUpperCase();
    return { q: `${city},${state},US` };
  }
  return { q: input };
}

export function fetchWeather(rawCityOrZip) {
  // Accept input like "Chicago", "Chicago, IL", "Chicago,IL,US", "60601", or "60601,US"
  const query = {
    units,
    appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
    ...parseQuery(rawCityOrZip),
  };
  const search = new URLSearchParams(query).toString();
  const url = `https://api.openweathermap.org/data/2.5/forecast?${search}`;

  const request = fetch(url)
    .then(async (res) => {
      let data = null;
      try {
        data = await res.json();
      } catch (e) {
        // ignore JSON parse errors
      }
      return { status: res.status, data };
    })
    .catch((err) => ({ status: 0, error: true, data: null }));

  return {
    type: 'FETCH_WEATHER',
    payload: request,
    meta: { query: query.q || query.zip },
  };
}

export function weatherRequest(query) {
  return { type: 'WEATHER_REQUEST', meta: { query } };
}

export function removeWeather(cityId) {
  return {
    type: REMOVE_WEATHER,
    payload: cityId,
  };
}

export function clearWeather() {
  return {
    type: CLEAR_WEATHER,
  };
}
