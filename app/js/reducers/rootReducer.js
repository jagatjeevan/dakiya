import { combineReducers } from 'redux';
import packages from './packages';
import employees from './employees';
import vendors from './vendors';

const rootReducer = combineReducers({
  packages,
  employees,
  vendors,
});

export default rootReducer;
