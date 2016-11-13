import { READING_ADD, READING_EDIT, READING_DELETE } from '../../actions/module/reading';

export default function reading(state = {}, action) {
  const { moduleCode, reading, index } = action.payload;

  if (moduleCode !== state.code) {
    return state;
  }

  switch (action.type) {
    case READING_ADD:
      return {
        ...state,
        readings: state.readings ? [...state.readings, reading] : [reading]
      }

    case READING_EDIT:
      return  {
        ...state,
        readings: [...state.readings.slice(0, index), reading, ...state.readings.slice(index + 1)]
      };

    case READING_DELETE:
      return  {
        ...state,
        readings: [...state.readings.slice(0, index), ...state.readings.slice(index + 1)]
      };

    default:
      return state;
  }
}
