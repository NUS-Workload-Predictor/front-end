import { combineReducers } from 'redux';

import modules from './module';
import widgets from './widget';
import moduleList from './moduleList';
import profile from './profile';

const rootReducer = combineReducers({
  modules,
  widgets,
  moduleList,
  profile
});

export default rootReducer;
