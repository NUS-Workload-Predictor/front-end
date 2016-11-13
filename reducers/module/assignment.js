import { ASSIGNMENT_ADD, ASSIGNMENT_EDIT, ASSIGNMENT_DELETE } from '../../actions/module/assignment';

export default function assignment(state = {}, action) {
  const { moduleCode, assignment, index } = action.payload;

  if (moduleCode != state.code) {
    return state;
  }

  switch (action.type) {
    case ASSIGNMENT_ADD:
      return {
        ...state,
        assignments: state.assignments ? [...state.assignments, assignment] : [assignment]
      }

    case ASSIGNMENT_EDIT:

    case ASSIGNMENT_DELETE:
      return {
        ...state,
        assignments: [...state.assignments.slice(0, index), ...state.assignments.slice(index + 1)]
      };

    default:
      return state;
  }
}
