import React from 'react';
import { TYPES } from '../constants';

function DeckStats({ stats }) {
  const getStat = (type) => (
    <span key={type}>{TYPES[type]}: {stats[type]}&nbsp;&nbsp;</span>
  );

  return (
    <span>
      {Object.keys(TYPES).map(getStat)}
    </span>
  );
}

export default DeckStats;