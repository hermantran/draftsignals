import React, { Component } from 'react';

class Card extends Component {
  getImageLink(name) {
    return 'http://gatherer.wizards.com/Handlers/Image.ashx?type=card&name=' + name;
  }

  render() {
    let { card } = this.props;
    return (
      <div>
        <img src={this.getImageLink(card.name)}/>
        <div className="center-align">{card.name}</div>
      </div>
    );
  }
}

export default Card;