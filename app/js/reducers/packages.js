import * as actionTypes from '../util/actionsTypes';

const initialState = {
  isFetching: false,
  items: [],
};

export default function packages(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_PACKAGES:
      return Object.assign({}, state, { isFetching: true });
    case actionTypes.RECEIVE_PACKAGES:
      return Object.assign(
        {},
        state,
        {
          isFetching: false,
          items: action.packages,
        });
    default:
      return state;
  }
}

