import { MODULE_LIST_SET } from '../actions/moduleList';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case MODULE_LIST_SET:
      return action.payload;

    default:
      return state;
  }
}
