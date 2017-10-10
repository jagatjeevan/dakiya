import Parse from './parseConfig';
import * as actionTypes from '../util/actionsTypes';
import * as notificationActions from './notification';
import axios from 'axios';
import { url } from '../jigsawConfig';
import { authorizationToken } from '../jigsawConfig';

let jigsawEmployeeList = [];

function requestEmployeeData(pageNumber) {
  return {
    type: actionTypes.REQUEST_EMPLOYEE_DATA,
    payload: pageNumber,
  }
}

function receiveEmployeeData(pageNumber) {
  return {
    type: actionTypes.RECEIVE_EMPLOYEE_DATA,
  }
}

function getPageCount(callback) {
  axios.get(url, {
    headers: {"Authorization": authorizationToken}
  }).then(function(response) {
      callback(response.headers['x-total-pages']);
  });
}

function getJigsawEmployeeList(totalPages, page=1, dispatch) {
  dispatch(requestEmployeeData(page));

  axios.get(url+"&page="+page, {
    headers: {"Authorization": authorizationToken}
  }).then(function(response) {
    jigsawEmployeeList = jigsawEmployeeList.concat(response.data);
    if(page < totalPages) {
      return getJigsawEmployeeList(totalPages, page+1, dispatch);
    }
    dumpInDatabase();
    dispatch(receiveEmployeeData());
  });
}

function dumpInDatabase() {
  let excelSheetList = require('./raw.json');
  
  var employeeList = excelSheetList.map(x => Object.assign(x, jigsawEmployeeList.find(y => y.employeeId == x.EmpID)));
  employeeList=employeeList.filter(x => x.preferredName);

  const Employee = Parse.Object.extend('Employee');

  for(var empIndex=0; empIndex<employeeList.length; empIndex++) {
    const emp = new Employee();
    emp.set('name', employeeList[empIndex].preferredName);
    emp.set('email', employeeList[empIndex].loginName+"@thoughtworks.com");
    emp.set('employeeId', employeeList[empIndex].employeeId);
    emp.set('siteCode', employeeList[empIndex].SiteCode);
    emp.set('cardID', employeeList[empIndex].CardID);

    const query = new Parse.Query(Employee);

    query.matches('employeeId', employeeList[empIndex].employeeId);
    query.find({
      success: function(result) {
        if(result.length == 0) {
          emp.save(null, {
            success(result) {
            },
            error(gameScore, error) {
              alert(`Failed to create new object, with error code: ${error.message}`);
            }
          });
        }
      }
    });
  }
}

export const updateEmployeeData = () => (
  (dispatch) => {
      getPageCount(function(pageCount) {
      getJigsawEmployeeList(pageCount, 1, dispatch);
    });
  }
);
  