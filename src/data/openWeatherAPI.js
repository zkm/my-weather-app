import axios from 'axios';

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const REMOVE_WEATHER = 'REMOVE_WEATHER';
export const CLEAR_WEATHER = 'CLEAR_WEATHER';
const units = 'imperial';

export function fetchWeather(rawCityOrZip) {
  // Accept input like "Chicago", "Chicago, IL", "Chicago,IL,US", "60601", or "60601,US"
  let input = (rawCityOrZip || '').trim();

  // ZIP format detection: 5 digits (US), optionally with a country code
  const zipOnly = input.match(/^\d{5}$/);
  const zipWithCountry = input.match(/^(\d{5}),\s*([A-Za-z]{2})$/);

  // City, ST -> City,ST,US normalization
  const usCityStateMatch = input.match(/^([^,]+),\s*([A-Za-z]{2})$/);
  const isZipSearch = !!zipOnly || !!zipWithCountry;

  const params = {
    units,
    appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
  };

  if (isZipSearch) {
    const zip = zipOnly ? input : zipWithCountry[1];
    const country = zipOnly ? 'US' : zipWithCountry[2].toUpperCase();
    params.zip = `${zip},${country}`;
  } else {
    let q = input;
    if (usCityStateMatch) {
      const city = usCityStateMatch[1].trim();
      const state = usCityStateMatch[2].toUpperCase();
      q = `${city},${state},US`;
    }
    params.q = q;
  }

  const request = axios.get('https://api.openweathermap.org/data/2.5/forecast', {
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
