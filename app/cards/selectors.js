import { createSelector } from 'reselect';
import { SORTS, RARITY, COLORS } from './constants';

const getDeck = (state) => state.deck;
const getDraft = (state) => state.draft;
const getPack = (state) => state.pack;
const getPick = (state) => state.pick;
const getSelectedShown = (state) => state.selectedShown;
const getReservedShown = (state) => state.reservedShown;
const getMissingShown = (state) => state.missingShown;

export const getMainDeckSort = (state) => state.mainDeckSort;
export const getSideboardSort = (state) => state.sideboardSort;

export const getPicks = createSelector(
  [getDraft, getPack, getPick],
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
  [getDraft, getPack, getPick],
  (cards, pack, pick) => {
    let filtered = cards.filter(card => card.isSelected &&
      ((card.pack < pack) || card.pack === pack && card.pick < pick));

    return filtered.map(card => Object.assign({}, card, { 
      isSelected: false,
      isReserved: false
    }));
  }
);

export const getMainDeck = createSelector(
  [getDeck],
  (cards) => cards.filter(card => !card.isSideboard)
);

export const getSideboard = createSelector(
  [getDeck],
  (cards) => cards.filter(card => card.isSideboard)
);

export const getMainDeckStats = createSelector(
  [getMainDeck],
  (cards) => cards.reduce((stats, card) => {
    stats[card.type] = stats[card.type] || 0;
    stats[card.type]++;
    return stats;
  }, {})
);

export const getMainDeckSorted = createSelector(
  [getMainDeck, getMainDeckSort],
  (cards, sort) => getCardsSorted(cards, sort)
);

export const getSideboardSorted = createSelector(
  [getSideboard, getSideboardSort],
  (cards, sort) => getCardsSorted(cards, sort)
);

function getCardsSorted(cards, sort) {
  let sorted = cards.reduce((columns, card) => {
    let type = card[sort];
    columns[type] = columns[type] || [];
    columns[type].push(card);
    return columns;
  }, {});

  return Object.keys(sorted).sort(getSortFunction(sort)).map(key => sorted[key]);
}

function getSortFunction(sort) {
  switch(sort) {
    case SORTS.cmc:
      return cmcSort;
    case SORTS.rarity:
      return raritySort;
    case SORTS.colors:
      return colorSort;
  }
}

function cmcSort(a, b) {
  return a - b;
}

function raritySort(a, b) {
  // Sort by descending rarity
  return rarityToNum(a) - rarityToNum(b);
}

function rarityToNum(rarity) {
  switch(rarity) {
    case RARITY.M:
      return 0;
    case RARITY.R:
      return 1;
    case RARITY.U:
      return 2;
    case RARITY.C:
      return 3;
  }
}

function colorSort(a, b) {
  // Show in WUBRG order, then any multi-color
  return colorToNum(a) - colorToNum(b);
}

function colorToNum(color) {
  switch(color) {
    case COLORS.W:
      return 0;
    case COLORS.U:
      return 1;
    case COLORS.B:
      return 2;
    case COLORS.R:
      return 3;
    case COLORS.G:
      return 4;
    default:
      return 5;
  }
}