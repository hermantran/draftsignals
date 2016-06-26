import React, { Component } from 'react';
import cards from '../cards';


const DraftUploaderContainer = cards.components.DraftUploaderContainer;

class Home extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 l6 offset-l3">
            <div className="card">
              <div className="card-content">
                <div className="card-title">Upload</div>
                <DraftUploaderContainer/>
              </div>
            </div>
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