import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import Promise from "redux-promise";
import { createStore, applyMiddleware } from "redux";
import "./assets/index.css";
import App from "./App";
import Reducers from "./context";

const createStoreWithMiddleware = applyMiddleware(Promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducers)}>
    <App />
  </Provider>,
  document.getElementById("root")
);
