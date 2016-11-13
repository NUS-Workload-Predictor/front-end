import { EXAM_ADD, EXAM_EDIT, EXAM_DELETE } from '../../actions/module/exam';

export default function exam(state = {}, action) {
  const { moduleCode, exam, index } = action.payload;

  if (moduleCode !== state.code) {
    return state;
  }

  switch (action.type) {
    case EXAM_ADD:
      return {
        ...state,
        exams: state.exams ? [...state.exams, exam] : [exam]
      }

    case EXAM_EDIT:

    case EXAM_DELETE:
      return {
        ...state,
        exams: [...state.exams.slice(0, index), ...state.exams.slice(index + 1)]
      };

    default:
      return state;
  }
}
