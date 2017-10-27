import * as actionTypes from '../util/actionsTypes';

const initialState = {
  cardSwipeStatus: '', 
};

export default function cardSwipe(state = initialState, action) {
    switch (action.type) {
      case actionTypes.SWIPPED_CARD_STATUS:
        return Object.assign({}, state, {cardSwipeStatus: action.status});
      
      default:
       return state;
    }
}
