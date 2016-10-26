import { combineReducers } from 'redux';

import modules from './module';
import widgets from './widget';

const rootReducer = combineReducers({
  modules,
  widgets
});

export default rootReducer;
