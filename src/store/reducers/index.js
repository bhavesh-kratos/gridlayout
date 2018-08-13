import { combineReducers } from 'redux';
import chartData from './testReducer';
import items from './items';

const rootReducer = combineReducers({
  chartData,
  items
});

export default rootReducer;
