import React, { Component } from 'react';
import Card from './Card';

class DraftViewer extends Component {
  render() {
    let createCard = (card) => {
      return <Card key={card.id} card={card}/>;
    };

    return (
      <div className="margin-top">
        {this.props.cards.map(createCard)}
      </div>
    );
  }
}

export default DraftViewer;