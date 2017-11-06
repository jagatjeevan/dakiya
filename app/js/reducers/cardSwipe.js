import * as actionTypes from '../util/actionsTypes';

const initialState = {
  cardSwipeStatus: 'Default',
  cardSwipeMessage: '',
};
const message = {
  'Success':'Your parcel has been successfully picked up',
  'Invalid':'Card is not linked to your profile. Please contact Admin.',
  'Unauthorized':'You are not authorized to collect this parcel.',
  'Default':'',
}

export default function cardSwipe(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SWIPPED_CARD_STATUS:
      return Object.assign({}, state, { cardSwipeStatus: action.status, cardSwipeMessage: message[action.status]});

    default:
      return state;
  }
}
