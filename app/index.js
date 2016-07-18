import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { App, Home, Draft } from './app';
import rootReducer from './rootReducer';
import { logPageView } from './analytics';

const router = routerMiddleware(browserHistory);
const store = createStore(rootReducer, applyMiddleware(thunk, router));
const history = syncHistoryWithStore(browserHistory, store);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} onUpdate={logPageView}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="draft" component={Draft} />
        <Redirect path="*" to="/" />
      </Route>
    </Router>
  </Provider>,
  MOUNT_NODE
);