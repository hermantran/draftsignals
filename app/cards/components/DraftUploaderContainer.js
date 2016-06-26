import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cardActions from '../actions';
import * as constants from '../constants';
import DraftUploader from './DraftUploader';

const mapStateToProps = (store) => {
  let state = store[constants.NAME];

  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(cardActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftUploader);