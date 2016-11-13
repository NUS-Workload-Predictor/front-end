import { PROJECT_ADD, PROJECT_EDIT, PROJECT_DELETE } from '../../actions/module/project';

export default function project(state = {}, action) {
    switch (action.type) {
      case PROJECT_ADD:
        const { moduleCode, project } = action.payload;

        if (moduleCode !== state.code) {
          return state;
        }

        return {
          ...state,
          projects: state.projects ? [...state.projects, project] : [project]
        }

      case PROJECT_EDIT:

      case PROJECT_DELETE:

      default:
        return state;
    }
}
