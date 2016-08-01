import * as types from './actionTypes';
import { SORTS } from './constants';

const initialState = {
  draft: [],
  deck: [],
  title: null,
  latest: [],
  mainDeckSort: SORTS.cmc,
  sideboardSort: SORTS.colors,
  pack: null,
  pick: null,
  packCount: 0,
  pickCount: 0,
  selectedShownOnce: false,
  selectedShown: false,
  reservedShown: false,
  missingShown: false,
  previousShown: true,
  commentsShown: false,
  success: true,
  loading: false
};

function cardReducer(state = initialState, action) {
  let { type, payload } = action;
  switch(type) {
    case types.UPLOAD:
      return Object.assign({}, state, {
        draft: payload.draft,
        deck: payload.deck,
        title: payload.title,
        pack: 1,
        pick: 1,
        packCount: payload.packCount,
        pickCount: payload.pickCount,
        selectedShownOnce: false,
        success: true,
        loading: false
      });
    case types.ADD_LATEST_DRAFTS:
      return Object.assign({}, state, payload);
    case types.VIEW_PREVIOUS:
      return getStateFromPackPick(state, state.pack, state.pick - 1);
    case types.VIEW_NEXT:
      return getStateFromPackPick(state, state.pack, state.pick + 1);
    case types.VIEW_PACK_PICK:
      return getStateFromPackPick(state, payload.pack, payload.pick);
    case types.SHOW_SELECTED_ONCE:
      return Object.assign({}, state, {
        selectedShownOnce: true
      });
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
    case types.TOGGLE_PREVIOUS:
      return Object.assign({}, state, {
        previousShown: !state.previousShown
      });
    case types.TOGGLE_COMMENTS:
      return Object.assign({}, state, {
        commentsShown: !state.commentsShown
      });
    case types.CHANGE_MAIN_DECK_SORT:
      return Object.assign({}, state, {
        mainDeckSort: payload.sort
      });
    case types.CHANGE_SIDEBOARD_SORT:
      return Object.assign({}, state, {
        sideboardSort: payload.sort
      });
    case types.SHOW_ERROR:
      return Object.assign({}, state, {
        loading: false,
        success: false
      });
    case types.SHOW_LOADING:
      return Object.assign({}, state, {
        loading: true,
        success: true
      });
    case types.RESET_ERROR:
      return Object.assign({}, state, {
        loading: false,
        success: true
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
    selectedShownOnce: false,
    pack,
    pick
  });
}

export default cardReducer;