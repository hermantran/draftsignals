import React, { Component } from 'react';
import Card from './Card';

class CardViewer extends Component {
  render() {
    let i = 0;

    let createPack = (pack) => {
      return <div>{pack.map(createPicks)}</div>;
    };

    let createPicks = (pick) => {
      return <div className="row">{pick.map(createCard)}</div>;
    };

    let createCard = (card) => {
      return <div className="col s2"><Card key={++i} card={card}/></div>;
    };

    return (
      <div>{this.props.cards.map(createPack)}</div>
    );
  }
}

export default CardViewer;