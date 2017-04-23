import { combineReducers } from 'redux';
import closedParcels from'./updateClosedParcels';
import openParcels from './updateOpenParcels';

const rootReducer = combineReducers({
  closedParcels,
  openParcels
});

export default rootReducer;
