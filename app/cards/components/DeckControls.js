import React from 'react';
import { RadioButton } from '../../common';
import { SORTS } from '../constants';

function DeckControls({ name, activeSort, changeSort }) {
  const isSort = (sort) => sort === activeSort;

  const createSort = (sort, label) => (
    <RadioButton
      name={name}
      id={`${name}-${sort}`}
      label={label}
      checked={isSort(sort)}
      onChange={changeSort.bind(this, sort)}
    />
  );

  return (
    <div>
      Sort By:
      {createSort(SORTS.cmc, 'CMC')}
      {createSort(SORTS.colors, 'Color')}
      {createSort(SORTS.rarity, 'Rarity')}
    </div>
  );
}

export default DeckControls;