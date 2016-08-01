import React, { Component } from 'react';
import classNames from 'classnames';
import DeckViewer from './DeckViewer';
import DraftComments from './DraftComments';
import DraftTitle from './DraftTitle';
import { Loader, ErrorMessage } from '../../common';

class DeckLayout extends Component {
  componentWillMount() {
    const { actions, id } = this.props;
    actions.get(id);
  }
  
  render() {
    const { loading, success, mainDeck, id, title, actions, commentsShown } = this.props;

    const commentsClass = classNames({
      hide: !commentsShown
    });

    const deckView = (
      <div>
        <div className="row">
          <div className="col s12">
            <DeckViewer {...this.props} />
          </div>
        </div>
        <DraftTitle
          id={id}
          title={title}
          commentsShown={commentsShown}
          toggleComments={actions.toggleComments}
          draftShown="true"
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
        error="Sorry, there was an error retrieving the deck you specified."
      />
    );

    const getView = () => {
      if (loading) {
        return loader;
      }
      else if (!success || !mainDeck.length) {
        return error;
      } else {
        return deckView;
      }
    };

    return getView();
  }
}

export default DeckLayout;