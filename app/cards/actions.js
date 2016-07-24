import * as types from './actionTypes';
import { push } from 'react-router-redux';
import { readDraftAndDeckFile, pickCount, packCount } from '../middleware/mtgoReader';

export function upload(draftFiles, deckFiles) {
  if (!draftFiles && !deckFiles) {
    return;
  }

  draftFiles = draftFiles || [];
  deckFiles = deckFiles || [];

  return (dispatch) => {
    dispatch(showLoading());
    return readDraftAndDeckFile(draftFiles[0], deckFiles[0])
      .then(({ draft, deck }) => dispatch(viewDraft(draft, deck)))
      .then(() => dispatch(push('/draft')))
      .catch(() => dispatch(showError()));
  };
}

export function viewDraft(draft = [], deck = []) {
  console.log(draft, deck);
  return {
    type: types.UPLOAD,
    payload: {
      draft,
      deck,
      pickCount,
      packCount
    }
  };
}

export function viewPreviousPicks() {
  return {
    type: types.VIEW_PREVIOUS
  };
}

export function viewNextPicks() {
  return {
    type: types.VIEW_NEXT
  };
}

export function viewPackPick(pack, pick) {
  return {
    type: types.VIEW_PACK_PICK,
    payload: {
      pack,
      pick
    }
  };
}

export function toggleSelected() {
  return {
    type: types.TOGGLE_SELECTED
  };
}

export function toggleReserved() {
  return {
    type: types.TOGGLE_RESERVED
  };
}

export function toggleMissing() {
  return {
    type: types.TOGGLE_MISSING
  };
}

export function togglePrevious() {
  return {
    type: types.TOGGLE_PREVIOUS
  };
}

export function changeMainDeckSort(sort) {
  return {
    type: types.CHANGE_MAIN_DECK_SORT,
    payload: {
      sort
    }
  };
}

export function changeSideboardSort(sort) {
  return {
    type: types.CHANGE_SIDEBOARD_SORT,
    payload: {
      sort
    }
  };
}

export function showLoading() {
  return {
    type: types.SHOW_LOADING
  };
}

export function showError() {
  return {
    type: types.SHOW_ERROR
  };
}