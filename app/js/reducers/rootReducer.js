import { combineReducers } from 'redux';
import packages from './packages';

const rootReducer = combineReducers({
  packages,
});

export default rootReducer;
