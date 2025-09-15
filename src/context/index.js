import { combineReducers } from 'redux';
import weatherReducer from './reducerWeather';
import uiReducer from './reducerUi';

const rootReducer = combineReducers({
  weather: weatherReducer,
  ui: uiReducer,
});

export default rootReducer;
