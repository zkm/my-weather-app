import { FETCH_WEATHER } from '../data/openWeatherAPI';

export default function weatherReducer(state = [], action) {
  console.log(state);
  switch (action.type) {
    case FETCH_WEATHER:
      // If the request failed or data is missing, ignore this action
      if (!action || action.error || !action.payload || !action.payload.data) {
        return state;
      }
      return [...state, action.payload.data];

    default:
      return state;
  }
}
