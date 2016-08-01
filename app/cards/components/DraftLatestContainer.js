import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cardActions from '../actions';
import * as constants from '../constants';
import DraftLatest from './DraftLatest';

const mapStateToProps = (store) => {
  let { latest } = store[constants.NAME];
  return { latest };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(cardActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftLatest);