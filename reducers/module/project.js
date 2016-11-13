import { PROJECT_ADD, PROJECT_EDIT, PROJECT_DELETE } from '../../actions/module/project';

export default function project(state = {}, action) {
  const { moduleCode, project, index } = action.payload;

  if (moduleCode !== state.code) {
    return state;
  }

  switch (action.type) {
    case PROJECT_ADD:
      return {
        ...state,
        projects: state.projects ? [...state.projects, project] : [project]
      };

    case PROJECT_EDIT:
      return {
        ...state,
        projects: [...state.projects.slice(0, index), project, ...state.projects.slice(index + 1)]
      };

    case PROJECT_DELETE:
      return {
        ...state,
        projects: [...state.projects.slice(0, index), ...state.projects.slice(index + 1)]
      };

    default:
      return state;
  }
}
