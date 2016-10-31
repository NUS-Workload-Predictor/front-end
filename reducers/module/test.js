import { TEST_ADD, TEST_EDIT, TEST_DELETE } from '../../actions/module/test';

export default function test(state = {}, action) {
    switch (action.type) {
      case TEST_ADD:
        const { moduleCode, test } = action.payload;

        if (moduleCode !== state.code) {
          return state;
        }

        return {
          ...state,
          tests: state.tests ? [...state.tests, test] : [test]
        }

      case TEST_EDIT:

      case TEST_DELETE:

      default:
        return state;
    }
}
