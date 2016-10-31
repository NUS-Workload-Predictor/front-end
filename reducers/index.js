import { combineReducers } from 'redux';

import modules from './module';
import widgets from './widget';
import tests from './module/test';

const rootReducer = combineReducers({
  modules,
  widgets
});

export default rootReducer;
