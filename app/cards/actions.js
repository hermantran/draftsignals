import * as types from './actionTypes';
import { push } from 'react-router-redux';
import { readDraftAndDeckFile, pickCount, packCount } from '../middleware/draftReader';

export function upload(draftFiles, deckFiles) {
  if (!draftFiles && !deckFiles) {
    return;
  }

  draftFiles = draftFiles || [];
  deckFiles = deckFiles || [];

  return (dispatch) => {
    dispatch(showLoading());
    return readDraftAndDeckFile(draftFiles[0], deckFiles[0])
      .then(({ draft }) => dispatch(viewDraft(draft)))
      .then(() => dispatch(push('/draft')))
      .catch(() => dispatch(showError()));
  };
}

export function viewDraft(cards = []) {
  return {
    type: types.UPLOAD,
    payload: {
      cards,
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