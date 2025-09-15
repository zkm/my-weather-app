import { parseQuery } from './openWeatherAPI';

test('parses city', () => {
  expect(parseQuery('Chicago')).toEqual({ q: 'Chicago' });
});

test('normalizes City, ST to City,ST,US', () => {
  expect(parseQuery('Chicago, il')).toEqual({ q: 'Chicago,IL,US' });
});

test('parses ZIP with default US', () => {
  expect(parseQuery('60601')).toEqual({ zip: '60601,US' });
});

test('parses ZIP with country', () => {
  expect(parseQuery('60601,us')).toEqual({ zip: '60601,US' });
});
