import { createSelector } from 'reselect';

const getCards = (state) => state.cards;
const getPack = (state) => state.pack;
const getPick = (state) => state.pick;

export const getPicks = createSelector(
  [getCards, getPack, getPick],
  (cards, pack, pick) => {
    return cards.filter(card => card.pack === pack && card.pick === pick);
  }
);

export const getSelected = createSelector(
  [getCards, getPack, getPick],
  (cards, pack, pick) => {
    return cards.filter(card => card.isSelected &&
      ((card.pack < pack) || card.pack === pack && card.pick < pick));
  }
);