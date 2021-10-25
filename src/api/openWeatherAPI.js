import axios from "axios";

export const FETCH_WEATHER = "FETCH_WEATHER";
const units = "imperial";

export function fetchWeather(city) {
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${process
    .env.REACT_APP_OPEN_WEATHER_API_KEY}`;
  const request = axios.get(url);

  return {
    type: "FETCH_WEATHER",
    payload: request
  };
}
