import React, { Component } from 'react';
import classNames from 'classnames';
import Card from './Card';
import './draft-previous-picks.scss';

class DraftPreviousPicks extends Component {
  componentDidUpdate() {
    let node = this.pickWrapper;
    node.scrollTop = node.scrollHeight;
  }

  render() {
    let i = 0;

    let getCardStyle = () => {
      return {
        top: `${i++ * 29}px`
      };
    };

    let wrapperClass = classNames({
      hide: !this.props.previousShown
    });

    let createCard = (card) => {
      return (
        <div key={card.id} className="previous-pick" style={getCardStyle()}>
          <Card
            card={card}
            hideName="true"
            hideEnlarged="true"
          />
        </div>
      );
    };

    return (
      <div className={wrapperClass}>
        <h5 className="center"><strong>Previous Picks</strong></h5>
        <div className="previous-picks-wrapper" ref={(node) => this.pickWrapper = node}>
          {this.props.cards.map(createCard)}
        </div>
      </div>
    );
  }
}

export default DraftPreviousPicks;