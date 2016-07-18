import React, { Component } from 'react';
import classNames from 'classnames';
import './card.scss';

class Card extends Component {
  render() {
    const GATHERER_URL = 'http://gatherer.wizards.com/',
        IMAGE_URL = `${GATHERER_URL}Handlers/Image.ashx?type=card`,
        CARD_URL = `${GATHERER_URL}Pages/Card/Details.aspx?`;

    const getImageLink = (card) => {
      let { name, set } = card,
          formattedSet = set ? `&set=${set}` : '';

      return `${IMAGE_URL}&name=${name}${formattedSet}`;
    };

    const getCardLink = (card) => {
      let { name } = card;
      return `${CARD_URL}name=${name}`;
    };

    const getCardName = (card) => (
      <div className="center-align">{card.name}</div>
    );

    const getCardEnlarged = (card) => (
      <div className="card-enlarged">
        <a href={getCardLink(card)} target="_blank">
          <img src={getImageLink(card)} alt={card.name} />
        </a>
      </div>
    );

    let { card, hideName, hideEnlarged } = this.props;

    let wrapperClass = classNames({
      'card-wrapper': true,
      selected: card.isSelected,
      missing: card.isMissing
    });

    return (
      <div className={wrapperClass}>
        <div className="card-checkmark"></div>
        <div className="card-placeholder"></div>
        <img className="card-image" src={getImageLink(card)} alt={card.name} />
        {!hideName ? getCardName(card) : null}
        {!hideEnlarged ? getCardEnlarged(card) : null}
      </div>
    );
  }
}

export default Card;