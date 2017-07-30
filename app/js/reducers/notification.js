import * as actionTypes from '../util/actionsTypes';

const initialState = {
  notificationContent: '',
  notificationClass: ''
};

export default function notification(state = initialState, action) {
  switch (action.type) {
    case actionTypes.OPEN_NOTIFICATION:
      return Object.assign({}, state, { 
        notificationContent: action.notificationContent,
        notificationClass: action.notificationClass
      });

    case actionTypes.CLOSE_NOTIFICATION:
      return initialState;

    default:
      return initialState;
  }
}
