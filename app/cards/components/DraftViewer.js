import React, { Component } from 'react';
import Card from './Card';

class DraftViewer extends Component {
  render() {
    let getTitle = () => {
      let { pack, pick } = this.props;
      return pick ? <h2>Pack {pack} Pick {pick}</h2> : null;
    };

    let createCard = (card) => {
      return <Card key={card.key} card={card}/>;
    };

    return (
      <div>
        {getTitle()}
        <div>
          {this.props.cards.map(createCard)}
        </div>
      </div>
    );
  }
}

export default DraftViewer;