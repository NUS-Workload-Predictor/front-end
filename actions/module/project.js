export const PROJECT_ADD = "PROJECT_ADD";
export const PROJECT_EDIT = "PROJECT_EDIT";
export const PROJECT_DELETE = "PROJECT_DELETE";

export function addProject(project) {
  return {
    type: PROJECT_ADD,
    payload: project
  };
}

export function editProject(index, project) {
  return {
    type: PROJECT_EDIT,
    payload: {
      index: index,
      project: project
    }
  };
}

export function deleteProject(index) {
  return {
    type: PROJECT_DELETE,
    payload: index
  };
}
