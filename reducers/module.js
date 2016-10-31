import { MODULE_ADD, MODULE_DELETE } from '../actions/module';
import { TEST_ADD, TEST_EDIT, TEST_DELETE } from '../actions/module/test';
import test from './module/test';

export default function modules(state = [], action) {
  switch (action.type) {
    case MODULE_ADD:
      return [ ...state,
        {
          code: action.payload,
          assignments: [],
          projects: [],
          presentations: [],
          readings: [],
          tests: [],
          exams: []
        }];

    case MODULE_DELETE:
      return [...state.slice(0, action.payload), ...state.slice(action.payload + 1)];

    case TEST_ADD:
      return state.map(m => test(m, action));

    case TEST_EDIT:
      return state;

    case TEST_DELETE:
      return state;

    default:
      return state;
  }
}
