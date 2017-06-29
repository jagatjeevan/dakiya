import { combineReducers } from 'redux';
import packages from './packages';
import employees from './employees';
import vendors from './vendors';
import sidebar from './sidebar';

const rootReducer = combineReducers({
  packages,
  employees,
  vendors,
  sidebar,
});

export default rootReducer;
