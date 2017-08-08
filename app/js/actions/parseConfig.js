import Parse from 'parse';
import Constants from '../appConfig';

Parse.initialize(Constants.XParseApplicationId);
// Parse.masterKey = Constants.XParseMasterKey;
Parse.serverURL = Constants.ApiBaseURL;

export default Parse;
