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

export const fetchPackages = (searchToken = '') =>  {
	return dispatch => {
		dispatch(requestPackages());
		var query = new Parse.Query(Package);
		if(searchToken.length > 3) {
		  const ownerMatches = new Parse.Query(Package);
      ownerMatches.contains('owner.name', searchToken)

      const packageIdMatches = new Parse.Query(Package);
      packageIdMatches.contains('packageId', searchToken);
      query = Parse.Query.or(ownerMatches, packageIdMatches);
    }
		query.include("owner");
		query.include("dealer");
		query.find(qp).then(result => {
			var data = result.map(mapper);
			dispatch(receivePackages(data))
		});
	}
}


