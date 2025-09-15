import { FETCH_WEATHER, REMOVE_WEATHER, CLEAR_WEATHER } from '../data/openWeatherAPI';

export default function weatherReducer(state = [], action) {
  console.log(state);
  switch (action.type) {
    case FETCH_WEATHER: {
      // If the request failed or data is missing, ignore this action
      const resp = action?.payload;
      const data = resp?.data;
      if (!resp || action.error || !data || resp.status !== 200 || !Array.isArray(data.list)) {
        return state;
      }
      // Prevent duplicates by city id
      const cityId = data.city?.id;
      if (cityId && state.some((c) => c?.city?.id === cityId)) {
        return state;
      }
      return [...state, data];
    }
    case REMOVE_WEATHER:
      return state.filter((c) => c?.city?.id !== action.payload);
    case CLEAR_WEATHER:
      return [];

    default:
      return state;
  }
}
