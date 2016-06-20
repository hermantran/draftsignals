import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cardActions from '../actions';
import * as constants from '../constants';
import { getPicks, getSelected } from '../selectors';
import DraftLayout from './DraftLayout';

const mapStateToProps = (store) => {
  let state = store[constants.NAME],
      { cards, pack, pick } = state,
      picks = getPicks(state),
      selected = getSelected(state);

  return { cards, pack, pick, picks, selected };
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