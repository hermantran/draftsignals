import React, { Component } from 'react';
import cards from '../cards';

const { DraftLayoutContainer } = cards.components;

class Draft extends Component {
  render() {
    return (
      <DraftLayoutContainer/>
    );
  }
}

export default Draft;