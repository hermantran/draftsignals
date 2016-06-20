import * as types from './actionTypes';
import { readDraftFile, pickCount, packCount } from '../api/draftReader';

export function uploadDraft(e) {
  if (!e.target.files.length) {
    return viewDraft();
  }

  return (dispatch) => {
    return readDraftFile(e.target.files[0])
    .then(cards => dispatch(viewDraft(cards)));
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