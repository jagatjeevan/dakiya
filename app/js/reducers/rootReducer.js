import { combineReducers } from 'redux';
import packages from './packages';
import employees from './employees';
import vendors from './vendors';
import sidebar from './sidebar';
import notification from './notification';
import auth from './auth';
import seedData from './seedData';
import cardSwipe from './cardSwipe';

const rootReducer = combineReducers({
  packages,
  employees,
  vendors,
  sidebar,
  notification,
  auth,
  seedData,
  cardSwipe,
});

export default rootReducer;
