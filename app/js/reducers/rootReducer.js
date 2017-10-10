import { combineReducers } from 'redux';
import packages from './packages';
import employees from './employees';
import vendors from './vendors';
import sidebar from './sidebar';
import notification from './notification';
import auth from './auth';
import seedData from './seedData';

const rootReducer = combineReducers({
  packages,
  employees,
  vendors,
  sidebar,
  notification,
  auth,
  seedData,
});

export default rootReducer;
