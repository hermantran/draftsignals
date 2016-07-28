import React, { Component } from 'react';
import DraftViewer from './DraftViewer';
import DraftControls from './DraftControls';
import DraftPreviousPicks from './DraftPreviousPicks';

class DraftLayout extends Component {
  componentWillMount() {
    let { actions, id } = this.props;
    actions.get(id);
  }

  render() {
    let { actions, selected, picks, pack, pick, packCount, pickCount,
          selectedShown, missingShown, previousShown } = this.props;
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
             toggleMissing={actions.toggleMissing}
             togglePrevious={actions.togglePrevious}
             selectedShown={selectedShown}
             missingShown={missingShown}
             previousShown={previousShown}
            />
            <DraftViewer cards={picks}/>
          </div>
          <div className="col s12 l2">
            <DraftPreviousPicks cards={selected} previousShown={previousShown}/>
          </div>
        </div>
      </div>
    );
  }
}

export default DraftLayout;