import axios from 'axios';

export const FETCH_WEATHER = 'FETCH_WEATHER';
const units = 'imperial';

export function fetchWeather(rawCity) {
  // Normalize input like "Chicago, IL" -> "Chicago,IL,US" for better accuracy
  let q = (rawCity || '').trim();
  const usCityStateMatch = q.match(/^([^,]+),\s*([A-Za-z]{2})$/);
  if (usCityStateMatch) {
    const city = usCityStateMatch[1].trim();
    const state = usCityStateMatch[2].toUpperCase();
    q = `${city},${state},US`;
  }

  const request = axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      q,
      units,
      appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
    },
    validateStatus: (status) => status >= 200 && status < 500, // allow reducer to handle errors
  });

  return {
    type: 'FETCH_WEATHER',
    payload: request,
  };
}
