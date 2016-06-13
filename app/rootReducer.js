import { combineReducers } from 'redux';
import cards from './cards';

var reducers = combineReducers({
  [cards.constants.NAME]: cards.reducer
});

export default reducers;