import * as actionTypes from '../util/actionsTypes';

const initialState = {
  isFetching: true,
  pageNumber: 1,
};

export default function seedData(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_EMPLOYEE_DATA:
      return Object.assign({}, state, { 
        isFetching: true,
        pageNumber: action.payload,
      });

    case actionTypes.RECEIVE_EMPLOYEE_DATA:
      return Object.assign({}, state, { isFetching: false });

    default:
      return state;
  }
}