import * as types from './actionTypes';

const initialState = {
  cards: [],
  pack: null,
  pick: null,
  packCount: 0,
  pickCount: 0,
  selectedShown: false,
  reservedShown: false,
  missingShown: false
};

function cardReducer(state = initialState, action) {
  let { type, payload } = action;
  switch(type) {
    case types.UPLOAD:
      return Object.assign({}, state, {
        cards: payload.cards,
        pack: 1,
        pick: 1,
        packCount: payload.packCount,
        pickCount: payload.pickCount
      });
    case types.VIEW_PREVIOUS:
      return getStateFromPackPick(state, state.pack, state.pick - 1);
    case types.VIEW_NEXT:
      return getStateFromPackPick(state, state.pack, state.pick + 1);
    case types.VIEW_PACK_PICK:
      return getStateFromPackPick(state, payload.pack, payload.pick);
    case types.TOGGLE_SELECTED:
      return Object.assign({}, state, {
        selectedShown: !state.selectedShown
      });
    case types.TOGGLE_RESERVED:
      return Object.assign({}, state, {
        reservedShown: !state.reservedShown
      });
    case types.TOGGLE_MISSING:
      return Object.assign({}, state, {
        missingShown: !state.missingShown
      });
  }

  return state;
}

function getStateFromPackPick(state, pack, pick) {
  if (pick < 1) {
    pack--;
    pick = state.pickCount;
  }
  else if (pick > state.pickCount) {
    pack++;
    pick = 1;
  }

  if (pack < 1 || pack > state.packCount) {
    return state;
  }

  return Object.assign({}, state, {
    pack,
    pick
  });
}

export default cardReducer;