import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { App, Home, Draft } from './app';
import rootReducer from './rootReducer';

const router = routerMiddleware(browserHistory);
const store = createStore(rootReducer, applyMiddleware(thunk, router));
const history = syncHistoryWithStore(browserHistory, store);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route path="/" component={Home}/>
        <Route path="/draft" component={Draft}/>
      </Route>
    </Router>
  </Provider>,
  MOUNT_NODE
);