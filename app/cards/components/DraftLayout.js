import React, { Component } from 'react';
import DraftUploader from './DraftUploader';
import DraftViewer from './DraftViewer';
import DraftControls from './DraftControls';

class CardLayout extends Component {
  render() {
    let { actions, picks, pack, pick, packCount, pickCount,
          selectedShown, reservedShown, missingShown } = this.props;
    return (
      <div>
        <DraftUploader onChange={actions.uploadDraft}/>
        <DraftControls 
         packCount={packCount}
         pickCount={pickCount}
         onPrev={actions.viewPreviousPicks}
         onNext={actions.viewNextPicks}
         selectPackPick={actions.viewPackPick}
         toggleSelected={actions.toggleSelected}
         toggleReserved={actions.toggleReserved}
         toggleMissing={actions.toggleMissing}
         selectedShown={selectedShown}
         reservedShown={reservedShown}
         missingShown={missingShown}
        />
        <DraftViewer cards={picks} pack={pack} pick={pick}/>
      </div>
    );
  }
}

export default CardLayout;