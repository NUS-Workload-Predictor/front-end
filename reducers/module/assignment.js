import { ASSIGNMENT_ADD, ASSIGNMENT_EDIT, ASSIGNMENT_DELETE } from '../../actions/module/assignment';

export default function assignment(state = {}, action) {
    switch (action.type) {
      case ASSIGNMENT_ADD:
        const { moduleCode, assignment } = action.payload;

        if (moduleCode !== state.code) {
          return state;
        }

        return {
          ...state,
          assignments: state.assignments ? [...state.assignments, assignment] : [assignment]
        }

      case ASSIGNMENT_EDIT:

      case ASSIGNMENT_DELETE:

      default:
        return state;
    }
}
