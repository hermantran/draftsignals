import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cardActions from '../actions';
import * as constants from '../constants';
import { getFilteredPicks, getSelected } from '../selectors';
import DraftLayout from './DraftLayout';

const mapStateToProps = (store, props) => {
  let state = store[constants.NAME],
      { pack, pick, pickCount, packCount,
        selectedShown, missingShown, previousShown } = state,
      { id } = props.params,
      picks = getFilteredPicks(state),
      selected = getSelected(state);

  return { id, pack, pick, pickCount, packCount,
   selectedShown, missingShown, previousShown, picks, selected };
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