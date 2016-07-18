import React, { Component } from 'react';
import cards from '../cards';

const { DraftUploaderContainer } = cards.components;

class Home extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 l6 offset-l3">
            <DraftUploaderContainer/>
          </div>
        </div>
        <div className="row">
          <div className="col s12 l6 offset-l3">
            <div className="card">
              <div className="card-content">
                <div className="card-title">Latest Drafts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;