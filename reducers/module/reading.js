import { READING_ADD, READING_EDIT, READING_DELETE } from '../../actions/module/reading';

export default function reading(state = {}, action) {
    switch (action.type) {
      case READING_ADD:
        const { moduleCode, reading } = action.payload;

        if (moduleCode !== state.code) {
          return state;
        }

        return {
          ...state,
          readings: state.readings ? [...state.readings, reading] : [reading]
        }

      case READING_EDIT:

      case READING_DELETE:

      default:
        return state;
    }
}
