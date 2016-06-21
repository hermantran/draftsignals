import { createSelector } from 'reselect';

const getCards = (state) => state.cards;
const getPack = (state) => state.pack;
const getPick = (state) => state.pick;
const getSelectedShown = (state) => state.selectedShown;
const getReservedShown = (state) => state.reservedShown;
const getMissingShown = (state) => state.missingShown;

export const getPicks = createSelector(
  [getCards, getPack, getPick],
  (cards, pack, pick) => {
    return cards.filter(card => card.pack === pack && card.pick === pick);
  }
);

export const getMaskedPicks = createSelector(
  [getPicks, getSelectedShown, getReservedShown],
  (picks, selectedShown, reservedShown) => {
    return picks.map(card => Object.assign({}, card, { 
      isSelected: selectedShown ? card.isSelected : false,
      isReserved: reservedShown ? card.isReserved : false
    }));
  }
);

export const getFilteredPicks = createSelector(
  [getMaskedPicks, getMissingShown],
  (picks, missingShown) => {
    if (missingShown) {
      return picks;
    }

    return picks.filter(card => card.isMissing === missingShown);
  }
);

export const getSelected = createSelector(
  [getCards, getPack, getPick],
  (cards, pack, pick) => {
    return cards.filter(card => card.isSelected &&
      ((card.pack < pack) || card.pack === pack && card.pick < pick));
  }
);