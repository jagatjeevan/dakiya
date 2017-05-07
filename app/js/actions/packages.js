import Constants from '../constants';
var Parse = require('parse');

Parse.initialize(Constants.XParseApplicationId);
Parse.masterKey = Constants.XParseMasterKey;
Parse.serverURL = Constants.ApiBaseURL;

export const REQUEST_PACKAGES = "REQUEST_PACKAGES";
export const RECEIVE_PACKAGES = 'RECEIVE_PACKAGES';

function requestPackages() {
	return {
		type: REQUEST_PACKAGES,
	};
}

function receivePackages(packages) {
	return {
		type: RECEIVE_PACKAGES,
		packages,
	};
}

const qp = { useMasterKey: true }
const mapper = o => o.toJSON();
let Package = Parse.Object.extend('Package');

export function fetchPackages() {
	return dispatch => {
		dispatch(requestPackages())
		var query = new Parse.Query(Package);
		query.include("owner");
		query.include("dealer");
		query.find(qp).then(result => {
			var data = result.map(mapper)
			dispatch(receivePackages(data))
		});
	}
}
