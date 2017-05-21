import * as actionTypes from '../util/actionsTypes';

const initialState = {
  employees: [],
  selectedEmployee: {},
};

export default function employees(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_EMPLOYEE:
      return Object.assign({}, state, { employees: action.payload });

    case actionTypes.SELECTED_EMPLOYEE:
      return Object.assign({}, state, { selectedEmployee: action.payload });

    default:
      return initialState;
  }
}
