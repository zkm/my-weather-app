import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import reduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import './assets/index.css';
import App from './App';
import Reducers from './context';

// redux-promise is CommonJS. Since Vite 8.3 the default import is its whole
// module.exports ({ default: fn }) rather than the middleware itself.
const promiseMiddleware = reduxPromise.default ?? reduxPromise;

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={createStoreWithMiddleware(Reducers)}>
    <App />
  </Provider>,
);
