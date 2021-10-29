import axios from "axios";

export const FETCH_WEATHER = "FETCH_WEATHER";
const units = "imperial";

export function fetchWeather(city) {
  const weatherAPI = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${weatherAPI}`;
  // const request = axios.get(url)
  return axios.get(url)
  .then(({data}) => {
    // handle success
    console.log(data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

  // return {
  //   type: "FETCH_WEATHER",
  //   payload: request
  // };
}

