import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cardActions from '../actions';
import * as constants from '../constants';
import CardLayout from './CardLayout';

function mapStateToProps(store) {
  let state = store[constants.NAME],
      cards = state.cards;
  
  return {
    cards
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(cardActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardLayout);