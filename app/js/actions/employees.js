import Parse from 'parse';

import * as actionTypes from '../util/actionsTypes';
import Constants from '../appConfig';

const mapper = o => o.toJSON();

Parse.initialize(Constants.XParseApplicationId);
Parse.masterKey = Constants.XParseMasterKey;
Parse.serverURL = Constants.ApiBaseURL;

export function updateEmployee(data) {
  return {
    type: actionTypes.FETCH_EMPLOYEE,
    payload: data,
  };
}

export function selectedEmployee(emp) {
  return {
    type: actionTypes.SELECTED_EMPLOYEE,
    payload: emp,
  };
}

export function fetchEmployee(searchToken) {
  return ((dispatch) => {
    const Employee = Parse.Object.extend('Employee');
    const query = new Parse.Query(Employee);
    if (searchToken !== '') {
      query.matches('name', searchToken, 'i');
      query.find({
        success: (res) => {
          dispatch(updateEmployee(res.map(mapper)));
        },
        error: (res) => {
          /* eslint no-console: 0 */
          console.log('error', res);
        },
      });
    } else {
      dispatch(updateEmployee([]));
    }
  });
}
