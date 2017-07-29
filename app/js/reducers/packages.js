import * as actionTypes from '../util/actionsTypes';

const initialState = {
  isFetching: false,
  items: [],
  pickedPackage: {},
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

    case actionTypes.CLEAR_PICK_PACKAGE:
      return Object.assign({}, state, { pickedPackage: {} });

    case actionTypes.PICK_PACKAGE:
      console.log("package is picked", action.pkg);
      return Object.assign({}, state, { pickedPackage: action.pkg });

    default:
      return state;
  }
}

