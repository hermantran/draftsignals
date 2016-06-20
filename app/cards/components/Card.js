import React, { Component } from 'react';
import classNames from 'classnames';
import './card.scss';

class Card extends Component {
  render() {
    const GATHERER_URL = 'http://gatherer.wizards.com/Handlers/Image.ashx?type=card&';

    const getImageLink = (card) => {
      let { name, set } = card;

      return GATHERER_URL + '&name=' + name + '&set=' + set;
    };

    let { card } = this.props;

    let cardClass = classNames({
      'card-image': true,
      selected: card.isSelected,
      reserved: card.isReserved,
      missing: card.isMissing
    });

    let placeholderClass = classNames({
      'card-placeholder': true,
      missing: card.isMissing
    });

    return (
      <div className="card-wrapper">
        <div className={placeholderClass}></div>
        <img className={cardClass} src={getImageLink(card)}/>
        <div className="center-align">{card.name}</div>
      </div>
    );
  }
}

export default Card;