import Constants from '../constants';
var Parse = require('parse');

Parse.initialize(Constants.XParseApplicationId);
Parse.masterKey = Constants.XParseMasterKey;
Parse.serverURL = Constants.ApiBaseURL;

export function logout() {
	console.log("logging out...")
	Parse.User.logOut();
	window.location.href = "/login";
}
