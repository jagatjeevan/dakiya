import Parse from './parseConfig';
import * as actionTypes from '../util/actionsTypes';
import * as notificationActions from './notification';
import axios from 'axios';

let employeeList = [];

function getPageCount(callback) {
  axios.get("https://jigsaw.thoughtworks.net/api/people?working_office=Bangalore", {
    headers: {"Authorization": ""}
  }).then(function(response) {
      callback(response.headers['x-total-pages']);
  });
}

function getEmployeeList(totalPages, page=1) {
  axios.get("https://jigsaw.thoughtworks.net/api/people?working_office=Bangalore&page="+page, {
    headers: {"Authorization": ""}
  }).then(function(response) {
    console.log(response);
    employeeList = employeeList.concat(response.data);
    if(page < totalPages) {
      return getEmployeeList(totalPages, page+1);
    }
    dumpInDatabase();
  });
}

function dumpInDatabase() {
  const Employee = Parse.Object.extend('Employee');

  for(var empIndex=0; empIndex<employeeList.length; empIndex++) {
    const emp = new Employee();
    emp.set('name', employeeList[empIndex].preferredName);
    emp.set('email', employeeList[empIndex].loginName+"@thoughtworks.com");
    emp.set('employeeId', employeeList[empIndex].employeeId);
    emp.save(null, {
      success(result) {
      },
      error(gameScore, error) {
        alert(`Failed to create new object, with error code: ${error.message}`);
      }
    });
  }
}

export const updateEmployeeData = () => (
  (dispatch) => {
      getPageCount(function(pageCount) {
      getEmployeeList(pageCount, 1)
    });
  }
);
  