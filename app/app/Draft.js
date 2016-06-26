import React, { Component } from 'react';
import cards from '../cards';

let DraftLayoutContainer = cards.components.DraftLayoutContainer;

class Draft extends Component {
  render() {
    return (
      <DraftLayoutContainer/>
    );
  }
}

export default Draft;