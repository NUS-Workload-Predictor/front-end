import { combineReducers } from 'redux';

import modules from './module';
import widgets from './widget';
import moduleList from './moduleList';

const rootReducer = combineReducers({
  modules,
  widgets,
  moduleList
});

export default rootReducer;
