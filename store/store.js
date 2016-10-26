import { createStore } from 'redux';
import rootReducer from '../reducers/index'

const INITIAL_STATE = {
  modules: [],
  widgets: []
}

const store = createStore(rootReducer, INITIAL_STATE);

export default store;
