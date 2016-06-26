import React, { Component } from 'react';
import Card from './Card';
import './draft-previous-picks.scss';

class DraftPreviousPicks extends Component {
  render() {
    let i = 0;

    let getCardStyle = () => {
      return {
        top: `${i++ * 29}px`
      };
    };

    let createCard = (card) => {
      return (
        <div key={card.key} className="previous-pick" style={getCardStyle()}>
          <Card card={card} hideName="true"/>
        </div>
      );
    };

    return (
      <div>
        <h5 className="center"><strong>Previous Picks</strong></h5>
        <div className="previous-picks-wrapper">
          {this.props.cards.map(createCard)}
        </div>
      </div>
    );
  }
}

export default DraftPreviousPicks;