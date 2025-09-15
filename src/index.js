import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from "react-redux";
import Promise from "redux-promise";
import { createStore, applyMiddleware } from "redux";
import "./assets/index.css";
import App from "./App";
import Reducers from "./context";

const createStoreWithMiddleware = applyMiddleware(Promise)(createStore);


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={createStoreWithMiddleware(Reducers)}>
    <App />
  </Provider>
);
