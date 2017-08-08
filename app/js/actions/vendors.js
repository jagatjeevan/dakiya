import Parse from './parseConfig';
import * as actionTypes from '../util/actionsTypes';

function requestVendors() {
  return {
    type: actionTypes.REQUEST_VENDORS,
  };
}

function receiveVendors(vendors) {
  return {
    type: actionTypes.RECEIVE_VENDORS,
    vendors,
  };
}

const mapper = o => o.toJSON();
const Vendor = Parse.Object.extend('Vendor');

export const fetchVendors = () => (
  (dispatch) => {
    dispatch(requestVendors());
    const query = new Parse.Query(Vendor);
    query.find().then((result) => {
      const data = result.map(mapper);
      dispatch(receiveVendors(data));
    });
  }
);
