import React, { Component } from 'react';
import DraftUploader from './DraftUploader';
import DraftViewer from './DraftViewer';
import DraftControls from './DraftControls';

class CardLayout extends Component {
  render() {
    let { actions, picks, pack, pick } = this.props;
    return (
      <div>
        <DraftUploader onChange={actions.uploadDraft}/>
        <DraftControls onPrev={actions.viewPreviousPicks}
         onNext={actions.viewNextPicks}/>
        <DraftViewer cards={picks} pack={pack} pick={pick}/>
      </div>
    );
  }
}

export default CardLayout;