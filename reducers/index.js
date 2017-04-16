import { combineReducers } from 'redux';

import modules from './module';
import widgets from './widget';
import moduleList from './moduleList';
import profile from './profile';
import timeTable from './timeTable';

const rootReducer = combineReducers({
  modules,
  widgets,
  moduleList,
  profile,
  timeTable
});

export default rootReducer;
