import * as types from './actionTypes';

const initialState = {
  cards: []
};

function cardReducer(state = initialState, action) {
  switch(action.type) {
    case types.UPLOAD:
      return Object.assign({}, state, {
        cards: action.payload.cards
      });
  }

  return state;
}

export default cardReducer;