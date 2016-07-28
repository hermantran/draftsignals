import React, { Component } from 'react';
import DeckViewer from './DeckViewer';

class DeckLayout extends Component {
  componentWillMount() {
    let { actions, id } = this.props;
    actions.get(id);
  }
  
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