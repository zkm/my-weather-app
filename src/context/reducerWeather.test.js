import reducer from './reducerWeather';
import { FETCH_WEATHER, REMOVE_WEATHER, CLEAR_WEATHER } from '../data/openWeatherAPI';

function makeResponse(status, data) {
  return { status, data };
}

test('adds weather when response is 200 with list', () => {
  const city = { id: 123, name: 'Chicago', coord: { lon: -87.62, lat: 41.88 } };
  const list = [{ main: { temp: 70, humidity: 60, pressure: 1000 } }];
  const action = { type: FETCH_WEATHER, payload: makeResponse(200, { city, list }) };
  const state = reducer([], action);
  expect(state).toHaveLength(1);
  expect(state[0].city.id).toBe(123);
});

test('ignores non-200 or missing data', () => {
  const bad = { type: FETCH_WEATHER, payload: makeResponse(404, { message: 'not found' }) };
  expect(reducer([], bad)).toEqual([]);
  const missing = { type: FETCH_WEATHER, payload: makeResponse(200, {}) };
  expect(reducer([], missing)).toEqual([]);
});

test('prevents duplicates by city id', () => {
  const city = { id: 123, name: 'Chicago', coord: { lon: -87.62, lat: 41.88 } };
  const list = [{ main: { temp: 70 } }];
  const action = { type: FETCH_WEATHER, payload: makeResponse(200, { city, list }) };
  const state = reducer([], action);
  const state2 = reducer(state, action);
  expect(state2).toHaveLength(1);
});

test('remove and clear actions work', () => {
  const city = { id: 123, name: 'Chicago', coord: { lon: -87.62, lat: 41.88 } };
  const list = [{ main: { temp: 70 } }];
  const add = { type: FETCH_WEATHER, payload: makeResponse(200, { city, list }) };
  const s1 = reducer([], add);
  const s2 = reducer(s1, { type: REMOVE_WEATHER, payload: 123 });
  expect(s2).toHaveLength(0);
  const s3 = reducer(s1, { type: CLEAR_WEATHER });
  expect(s3).toHaveLength(0);
});
