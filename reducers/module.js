import { MODULE_ADD, MODULE_EDIT, MODULE_DELETE } from '../actions/module';

const INITIAL_STATE = {};

export default function module(state = INITIAL_STATE, action) {
  switch (action.type) {
    case MODULE_ADD:
      return state;

    case MODULE_EDIT:
      return state;

    case MODULE_DELETE:
      return state;

    default:
      return state;
  }
}
