import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cardActions from '../actions';
import * as constants from '../constants';
import { getFilteredPicks, getSelected } from '../selectors';
import DraftLayout from './DraftLayout';

const mapStateToProps = (store, props) => {
  let state = store[constants.NAME],
      { success, loading, title, pack, pick, pickCount, packCount, toggleComments,
        selectedShown, missingShown, previousShown, commentsShown, deck } = state,
      { id } = props.params,
      picks = getFilteredPicks(state),
      selected = getSelected(state);

  return { success, loading, title, id, pack, pick, pickCount, packCount, toggleComments,
   selectedShown, missingShown, previousShown, commentsShown, deck, picks, selected };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(cardActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftLayout);