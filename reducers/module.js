import { MODULE_ADD, MODULE_EDIT, MODULE_DELETE } from '../actions/module';

const INITIAL_STATE = {
  modules: [],
  widgets: []
};

export default function modules(state = INITIAL_STATE.modules, action) {
  switch (action.type) {
    case MODULE_ADD:
      return [ ...state, { code: action.payload }];

    case MODULE_EDIT:
      return state;

    case MODULE_DELETE:
      return state;

    default:
      return state;
  }
}
