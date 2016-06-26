import React, { Component } from 'react';
import DraftViewer from './DraftViewer';
import DraftControls from './DraftControls';
import DraftPreviousPicks from './DraftPreviousPicks';

class CardLayout extends Component {
  render() {
    let { actions, selected, picks, pack, pick, packCount, pickCount,
          selectedShown, reservedShown, missingShown } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col s12 l10">
            <DraftControls 
             pack={pack}
             pick={pick}
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
            <DraftViewer cards={picks}/>
          </div>
          <div className="col s12 l2">
            <DraftPreviousPicks cards={selected}/>
          </div>
        </div>
      </div>
    );
  }
}

export default CardLayout;