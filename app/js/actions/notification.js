import * as actionTypes from '../util/actionsTypes';

export function showNotification(notificationContent) {
  return {
    type: actionTypes.OPEN_NOTIFICATION,
    payload: notificationContent,
  };
}

export function hideNotification() {
  return {
    type: actionTypes.CLOSE_NOTIFICATION,
  };
}
