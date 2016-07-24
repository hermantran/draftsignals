import React, { Component } from 'react';
import DeckViewer from './DeckViewer';

class DeckLayout extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <DeckViewer {...this.props} />
        </div>
      </div>
    );
  }
}

export default DeckLayout;