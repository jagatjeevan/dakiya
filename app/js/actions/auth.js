import Constants from '../appConfig';

const Parse = require('parse');

Parse.initialize(Constants.XParseApplicationId);
Parse.masterKey = Constants.XParseMasterKey;
Parse.serverURL = Constants.ApiBaseURL;

export function logout() {
  /* eslint no-console: 0 */
  console.log('logging out...');
  Parse.User.logOut();
  window.location.href = '/login';
}
