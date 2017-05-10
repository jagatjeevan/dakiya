import Constants from '../appConfig';
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

const qp = { useMasterKey: true };
const mapper = o => o.toJSON();
let Package = Parse.Object.extend('Package');
let Employee = Parse.Object.extend('Employee');

export const fetchPackages = (searchToken = '') => {
	return dispatch => {
		dispatch(requestPackages());
		var query = new Parse.Query(Package);
		if (searchToken.length > 3) {

			var ownerNameQuery = new Parse.Query(Employee);
			ownerNameQuery.contains("name", searchToken)

			var ownerEmailQuery = new Parse.Query(Employee);
			ownerEmailQuery.contains("email", searchToken)

			var ownerPhoneQuery = new Parse.Query(Employee);
			ownerPhoneQuery.contains("phoneNumber", searchToken)

			var compoundOwnerQuery = Parse.Query.or(ownerNameQuery, ownerEmailQuery, ownerPhoneQuery);

			const packageIdQuery = new Parse.Query(Package);
			packageIdQuery.contains('packageId', searchToken);

			const ownerQuery = new Parse.Query(Package);
			ownerQuery.matchesQuery('owner', compoundOwnerQuery);

			query = Parse.Query.or(ownerQuery, packageIdQuery);
		}
		query.include("owner");
		query.include("dealer");
		query.find(qp).then(result => {
			var data = result.map(mapper);
			dispatch(receivePackages(data))
		});
	}
}


