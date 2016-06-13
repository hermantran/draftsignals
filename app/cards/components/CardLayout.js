import React, { Component } from 'react';
import CardUploader from './CardUploader';
import CardViewer from './CardViewer';

class CardLayout extends Component {
  render() {
    let { actions, cards } = this.props;
    return (
      <div>
        <CardUploader onChange={actions.uploadCards}/>
        <CardViewer cards={cards}/>
      </div>
    );
  }
}

export default CardLayout;