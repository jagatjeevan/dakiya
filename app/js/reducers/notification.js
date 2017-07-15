import * as actionTypes from '../util/actionsTypes';

const initialState = {
  notificationContent: '',
  notificationClass: ''
};

export default function notification(state = initialState, action) {
  switch (action.type) {
    case actionTypes.OPEN_NOTIFICATION:
      return Object.assign({}, state, { 
        notificationContent: action.payload.notificationContent,
        notificationClass: action.payload.notificationClass
      });
    case actionTypes.CLOSE_NOTIFICATION:
      return initialState;
    default:
      return initialState;
  }
}
