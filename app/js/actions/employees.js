import Parse from './parseConfig';

import * as actionTypes from '../util/actionsTypes';
import Constants from '../appConfig';

const mapper = o => o.toJSON();

export function updateEmployee(data) {
  return {
    type: actionTypes.FETCH_EMPLOYEE,
    payload: data,
  };
}

export function resetEmployeeList() {
  return {
    type: actionTypes.RESET_EMPLOYEE_LIST,
  };
}

export function selectedEmployee(emp) {
  return {
    type: actionTypes.SELECTED_EMPLOYEE,
    payload: emp,
  };
}

export function removeSelectedEmployee() {
  return {
    type: actionTypes.SELECTED_EMPLOYEE,
    payload: {},
  };
}

export function fetchEmployee(searchToken) {
  return ((dispatch) => {
    const Employee = Parse.Object.extend('Employee');
    const query = new Parse.Query(Employee);
    query.matches('name', searchToken, 'i');
    query.find().then((result) => {
      const data = result.map(mapper);
      dispatch(updateEmployee(data));
    });
  });
}
