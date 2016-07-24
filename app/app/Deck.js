import React, { Component } from 'react';
import cards from '../cards';

const { DeckLayoutContainer } = cards.components;

class Deck extends Component {
  render() {
    return (
      <DeckLayoutContainer/>
    );
  }
}

export default Deck;