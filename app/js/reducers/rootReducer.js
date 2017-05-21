import { combineReducers } from 'redux';
import packages from './packages';
import employees from './employees';

const rootReducer = combineReducers({
  packages,
  employees,
});

export default rootReducer;
