import { WIDGET_ADD, WIDGET_DELETE } from '../actions/widget';

const INITIAL_STATE = {};

export default function widget(state = INITIAL_STATE, action) {
  switch (action.type) {
    case WIDGET_ADD:
      return state;

    case WIDGET_DELETE:
      return state;

    default:
      return state;
  }
}
