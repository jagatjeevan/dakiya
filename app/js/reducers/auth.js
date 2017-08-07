import * as actionTypes from '../util/actionsTypes';

const initialState = {
	isFetching: false,
	isLoggedIn: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
	  return Object.assign({}, state, { isFetching: true, isLoggedIn: false });
	  
    case actionTypes.LOGIN_SUCCESS:
	  return Object.assign({}, state, { isFetching: false, isLoggedIn: true });
	  
    case actionTypes.LOGIN_FAILURE:
	  return Object.assign({}, state, { isFetching: false, isLoggedIn: false });
	  
    case actionTypes.LOGOUT_REQUEST:
	  return Object.assign({}, state, { isFetching: true });

	case actionTypes.LOGOUT_COMPLETE:
      return Object.assign({}, state, { isFetching: false, isLoggedIn: false  });

    default:
      return state;
  }
}

