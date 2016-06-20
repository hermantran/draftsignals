import React, { Component } from 'react';
import cards from '../cards';

let DraftLayoutContainer = cards.components.DraftLayoutContainer;

class App extends Component {
  render() {
    return (
      <DraftLayoutContainer/>
    );
  }
}

export default App;