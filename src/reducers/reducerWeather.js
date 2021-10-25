import { FETCH_WEATHER } from "../api/openWeatherAPI";

export default function weatherReducer(state = [], action) {
  console.log(state);
  switch (action.type) {
    case FETCH_WEATHER:
      return [...state, action.payload.data];

    default:
      return state;
  }
}
