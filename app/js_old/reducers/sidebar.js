import * as actionTypes from '../util/actionsTypes';

const initialState = {
  isSidebarOpen: false,
};

export default function sidebar(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDEBAR:
      return Object.assign({}, state, { isSidebarOpen: !state.isSidebarOpen });
    default:
      return initialState;
  }
}
