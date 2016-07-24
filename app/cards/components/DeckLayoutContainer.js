import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cardActions from '../actions';
import * as constants from '../constants';
import * as selectors from '../selectors';
import DeckLayout from './DeckLayout';

const mapStateToProps = (store) => {
  let state = store[constants.NAME],
      mainDeckStats = selectors.getMainDeckStats(state),
      mainDeck = selectors.getMainDeckSorted(state),
      mainDeckSort = selectors.getMainDeckSort(state),
      sideboard = selectors.getSideboardSorted(state),
      sideboardSort = selectors.getSideboardSort(state);

  return { mainDeckStats, mainDeck, mainDeckSort, sideboard, sideboardSort };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(cardActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckLayout);