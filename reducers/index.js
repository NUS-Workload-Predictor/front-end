import { combineReducers } from 'redux';

import module from './module';
import widget from './widget';

const rootReducer = combineReducers({
  module,
  widget
});

export default rootReducer;
