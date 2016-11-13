import { TEST_ADD, TEST_EDIT, TEST_DELETE } from '../../actions/module/test';

export default function test(state = {}, action) {
  const { moduleCode, test, index } = action.payload;

  if (moduleCode !== state.code) {
    return state;
  }

  switch (action.type) {
    case TEST_ADD:
      return {
        ...state,
        tests: state.tests ? [...state.tests, test] : [test]
      }

    case TEST_EDIT:

    case TEST_DELETE:
      return  {
        ...state,
        tests: [...state.tests.slice(0, index), ...state.tests.slice(index + 1)]
      };

    default:
      return state;
  }
}
