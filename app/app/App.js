import React, { Component } from 'react';
import cards from '../cards';

let CardLayoutContainer = cards.components.CardLayoutContainer;

class App extends Component {
  render() {
    return (
      <CardLayoutContainer/>
    );
  }
}

export default App;