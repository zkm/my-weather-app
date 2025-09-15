import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SearchBar from './searchBar';

function renderWithStore(ui, preloadedState = { ui: { loading: false, error: null, lastQuery: '' } }) {
  const reducer = (state = preloadedState, _action) => state;
  const store = createStore(reducer, preloadedState);
  return render(<Provider store={store}>{ui}</Provider>);
}

test('submit is disabled when input is empty', () => {
  renderWithStore(<SearchBar />);
  const button = screen.getByRole('button', { name: /submit/i });
  expect(button).toBeDisabled();
});
