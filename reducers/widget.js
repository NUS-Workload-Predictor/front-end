import { WIDGET_CHANGE } from '../actions/widget';

const INITIAL_STATE = {};

export default function widgets(state = INITIAL_STATE, action) {
  switch (action.type) {
    case WIDGET_CHANGE:
      return state.map((widget) => {
        return {
          type: widget.type,
          display: action.payload === widget.type ? true : false
        };
      })

    default:
      return state;
  }
}
