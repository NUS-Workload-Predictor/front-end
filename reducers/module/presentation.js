import { PRESENTATION_ADD, PRESENTATION_EDIT, PRESENTATION_DELETE } from '../../actions/module/presentation';

export default function presentation(state = {}, action) {
  const { moduleCode, presentation, index } = action.payload;

  if (moduleCode !== state.code) {
    return state;
  }

  switch (action.type) {
    case PRESENTATION_ADD:
      return {
        ...state,
        presentations: state.presentations ? [...state.presentations, presentation] : [presentation]
      }

    case PRESENTATION_EDIT:

    case PRESENTATION_DELETE:
      return {
        ...state,
        presentations: [...state.presentations.slice(0, index), ...state.presentations.slice(index + 1)]
      };

    default:
      return state;
  }
}
