import { EXAM_ADD, EXAM_EDIT, EXAM_DELETE } from '../../actions/module/exam';

export default function exam(state = {}, action) {
    switch (action.type) {
      case EXAM_ADD:
        const { moduleCode, exam } = action.payload;

        if (moduleCode !== state.code) {
          return state;
        }

        return {
          ...state,
          exams: state.exams ? [...state.exams, exam] : [exam]
        }

      case EXAM_EDIT:

      case EXAM_DELETE:

      default:
        return state;
    }
}
