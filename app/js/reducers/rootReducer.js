import { combineReducers } from 'redux';
import packages from './packages';
import employees from './employees';
import vendors from './vendors';
import sidebar from './sidebar';
import notification from './notification';

const rootReducer = combineReducers({
  packages,
  employees,
  vendors,
  sidebar,
  notification,
});

export default rootReducer;
