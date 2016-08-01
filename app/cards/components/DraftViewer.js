import React, { Component } from 'react';
import Card from './Card';
import './draft-viewer.scss';

class DraftViewer extends Component {
  render() {
    let createCard = (card) => {
      return <Card key={card.id} card={card}/>;
    };

    return (
      <div className="draft-wrapper">
        {this.props.cards.map(createCard)}
      </div>
    );
  }
}

export default DraftViewer;