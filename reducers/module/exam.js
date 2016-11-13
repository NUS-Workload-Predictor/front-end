import { EXAM_ADD, EXAM_EDIT, EXAM_DELETE } from '../../actions/module/exam';

export default function exam(state = {}, action) {
  const { moduleCode, exam, index } = action.payload;

  switch (action.type) {
    case EXAM_ADD:
      if (moduleCode !== state.code) {
        return state;
      }

      return {
        ...state,
        exams: state.exams ? [...state.exams, exam] : [exam]
      }

    case EXAM_EDIT:

    case EXAM_DELETE:
      if (moduleCode != state.code) {
        return state;
      }

      return {
        ...state,
        exams: [...state.exams.slice(0, index), ...state.exams.slice(index + 1)]
      };

    default:
      return state;
  }
}
