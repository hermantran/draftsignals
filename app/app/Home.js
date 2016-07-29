import React, { Component } from 'react';
import cards from '../cards';

const { DraftUploaderContainer, DraftLatestContainer } = cards.components;

class Home extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 l6 offset-l3">
            <DraftUploaderContainer />
          </div>
        </div>
        <div className="row">
          <div className="col s12 l6 offset-l3">
            <DraftLatestContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;