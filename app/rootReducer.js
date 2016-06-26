import { combineReducers } from 'redux';
import cards from './cards';
import { routerReducer } from 'react-router-redux';

var reducers = combineReducers({
  [cards.constants.NAME]: cards.reducer,
  routing: routerReducer
});

export default reducers;