import { PRESENTATION_ADD, PRESENTATION_EDIT, PRESENTATION_DELETE } from '../../actions/module/presentation';

export default function presentation(state = {}, action) {
    switch (action.type) {
      case PRESENTATION_ADD:
        const { moduleCode, presentation } = action.payload;

        if (moduleCode !== state.code) {
          return state;
        }

        return {
          ...state,
          presentations: state.presentations ? [...state.presentations, presentation] : [presentation]
        }

      case PRESENTATION_EDIT:

      case PRESENTATION_DELETE:

      default:
        return state;
    }
}
