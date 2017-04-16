import { PROFILE_UPDATE } from '../actions/profile';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROFILE_UPDATE:
      return action.payload;

    default:
      return state;
  }
}
