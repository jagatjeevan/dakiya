import * as actionTypes from '../util/actionsTypes';

const initialState = {
  isFetching: false,
  items: [],
};

export default function vendors(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_VENDORS:
      return Object.assign({}, state, { isFetching: true });
    case actionTypes.RECEIVE_VENDORS:
      return Object.assign(
        {},
        state,
        {
          isFetching: false,
          items: action.vendors,
        });
    default:
      return state;
  }
}
