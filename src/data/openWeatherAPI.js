export const FETCH_WEATHER = 'FETCH_WEATHER';
export const REMOVE_WEATHER = 'REMOVE_WEATHER';
export const CLEAR_WEATHER = 'CLEAR_WEATHER';
const units = 'imperial';

// Lazily require axios to avoid Jest ESM parsing issues when importing this
// module in tests that don't actually use axios (e.g., parseQuery unit tests).
let _axios;
function getAxios() {
  if (!_axios) {
    // eslint-disable-next-line global-require
    const mod = require('axios');
    // Support both ESM default export and CJS require shape
    _axios = mod && mod.default ? mod.default : mod;
  }
  return _axios;
}

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
  const params = {
    units,
    appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
  };
  Object.assign(params, parseQuery(rawCityOrZip));

  const request = getAxios().get('https://api.openweathermap.org/data/2.5/forecast', {
    params,
    validateStatus: (status) => status >= 200 && status < 500,
  });

  return {
    type: 'FETCH_WEATHER',
    payload: request,
    meta: { query: params.q || params.zip },
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
