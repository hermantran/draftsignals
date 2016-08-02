import React from 'react';
import Card from './Card';
import DeckStats from './DeckStats';
import DeckControls from './DeckControls';
import './deck-viewer.scss';

function DeckViewer({ mainDeck, mainDeckSort, mainDeckStats, sideboard, sideboardSort, actions }) {
  const createColumn = (column, index) => (
    <div className="deck-column" key={index}>
      <div className="center"><strong>{column.length}</strong></div>
      {column.map(createCard)}
    </div>
  );

  const getCardStyle = (index) => {
    return {
      top: `${30 + (index * 29)}px`
    };
  };

  const createCard = (card, index) => (
    <div key={card.id} className="deck-card" style={getCardStyle(index)}>
      <Card card={card} hideName="true" ignoreMobile="true" />
    </div>
  );

  return (
    <div className="row">
      <div className="col s12 l9 center">
        <h5><strong>Main Deck</strong></h5>
        <DeckStats stats={mainDeckStats} />
        <DeckControls
          name="mainDeckSort"
          activeSort={mainDeckSort}
          changeSort={actions.changeMainDeckSort}
        />
        <div className="deck-wrapper">
          {mainDeck.map(createColumn)}
        </div>
      </div>

      <div className="col s12 l3 center">
        <h5><strong>Sideboard</strong></h5>
        <div>&nbsp;</div>
        <DeckControls
          name="sideboardSort"
          activeSort={sideboardSort}
          changeSort={actions.changeSideboardSort}
        />
        <div className="deck-wrapper">
          {sideboard.map(createColumn)}
        </div>
      </div>
    </div>
  );
}

export default DeckViewer;