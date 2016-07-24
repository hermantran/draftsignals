import React from 'react';
import classNames from 'classnames';
import './card.scss';

function Card({ card, hideName, hideEnlarged }) {
  const GATHERER_URL = 'http://gatherer.wizards.com/',
      IMAGE_URL = `${GATHERER_URL}Handlers/Image.ashx?type=card`,
      CARD_URL = `${GATHERER_URL}Pages/Card/Details.aspx?`;

  const getImageLink = (name, set) => {
    let formattedSet = set ? `&set=${set}` : '';
    return `${IMAGE_URL}&name=${name}${formattedSet}`;
  };

  const getCardLink = (card) => {
    let { name } = card;
    return `${CARD_URL}name=${name}`;
  };

  const getCardName = (card) => (
    <div className="center-align">{card.name}</div>
  );

  const enlargedClass = classNames({
    'card-enlarged': true,
    'with-alt': card.altName,
    'without-name': hideName
  });

  const getCardEnlarged = (card) => (
    <div className={enlargedClass}>
      <a href={getCardLink(card)} target="_blank">
        <img src={getImageLink(card.name, card.set)} alt={card.name} />
        {card.altName ? getAltImageLink(card) : null}
      </a>
    </div>
  );

  const getAltImageLink = (card) => (
    <img src={getImageLink(card.altName, card.set)} alt={card.altName} />
  );

  const wrapperClass = classNames({
    'card-wrapper': true,
    selected: card.isSelected,
    missing: card.isMissing
  });

  return (
    <div className={wrapperClass}>
      <div className="card-checkmark"></div>
      <div className="card-placeholder"></div>
      <img className="card-image" src={getImageLink(card.name, card.set)} alt={card.name} />
      {!hideName ? getCardName(card) : null}
      {!hideEnlarged ? getCardEnlarged(card) : null}
    </div>
  );
}

export default Card;