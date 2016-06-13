import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { App } from './app';
import rootReducer from './rootReducer';

import 'materialize-css/dist/css/materialize.min.css';

const store = createStore(rootReducer, applyMiddleware(thunk));
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  MOUNT_NODE
);