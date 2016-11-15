import { WIDGET_ADD, WIDGET_MOVE, WIDGET_DELETE } from '../actions/widget';

const INITIAL_STATE = {};

export default function widgets(state = INITIAL_STATE, action) {
  switch (action.type) {
    case WIDGET_ADD:
      return [
        ...state,
        action.payload
      ];

    case WIDGET_MOVE:
      const { index, top, left } = action.payload;

      return [
        ...state.slice(0, index),
        {
          ...state[index],
          top: top,
          left: left
        },
        ...state.slice(index + 1)
      ];

    case WIDGET_DELETE:
      return [...state.slice(0, action.payload), ...state.slice(action.payload + 1)];

    default:
      return state;
  }
}
