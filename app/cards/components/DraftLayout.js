import React, { Component } from 'react';
import classNames from 'classnames';
import DraftViewer from './DraftViewer';
import DraftControls from './DraftControls';
import DraftPreviousPicks from './DraftPreviousPicks';
import DraftComments from './DraftComments';
import DraftTitle from './DraftTitle';
import { Loader, ErrorMessage } from '../../common';

class DraftLayout extends Component {
  componentWillMount() {
    const { actions, id } = this.props;
    actions.get(id);
  }

  render() {
    const { id, title, loading, success, actions, selected, picks, pack, pick,
      packCount, pickCount, selectedShown, missingShown, previousShown,
      commentsShown, deck } = this.props;

    const viewerClass = classNames({
      col: true,
      s12: true,
      l10: previousShown
    });

    const commentsClass = classNames({
      hide: !commentsShown
    });

    const draftView = (
      <div>
        <div className="row">
          <div className={viewerClass}>
            <DraftControls 
             pack={pack}
             pick={pick}
             packCount={packCount}
             pickCount={pickCount}
             onPrev={actions.viewPreviousPicks}
             onNext={actions.viewNextPicks}
             selectPackPick={actions.viewPackPick}
             showSelectedOnce={actions.showSelectedOnce}
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
            <DraftPreviousPicks
              cards={selected}
              previousShown={previousShown}
            />
          </div>
        </div>
        <DraftTitle
          id={id}
          title={title}
          commentsShown={commentsShown}
          toggleComments={actions.toggleComments}
          deckShown={deck.length}
        />
        <div className={commentsClass}>
          <DraftComments id={id} />
        </div>
      </div>
    );

    const loader = (
      <div className="margin-top center">
        <Loader />
      </div>
    );

    const error = (
      <ErrorMessage
        error="Sorry, there was an error retrieving the draft you specified."
      />
    );

    const getView = () => {
      if (loading) {
        return loader;
      }
      else if (!success || !picks.length) {
        return error;
      } else {
        return draftView;
      }
    };

    return getView();
  }
}

export default DraftLayout;