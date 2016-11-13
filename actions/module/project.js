export const PROJECT_ADD = "PROJECT_ADD";
export const PROJECT_EDIT = "PROJECT_EDIT";
export const PROJECT_DELETE = "PROJECT_DELETE";

export function addProject(moduleCode, project) {
  return {
    type: PROJECT_ADD,
    payload: {
      moduleCode: moduleCode,
      project: project
    }
  };
}

export function editProject(moduleCode, index, project) {
  return {
    type: PROJECT_EDIT,
    payload: {
      index: index,
      project: project
    }
  };
}

export function deleteProject(moduleCode, index) {
  return {
    type: PROJECT_DELETE,
    payload: {
      moduleCode: moduleCode,
      index: index
    }
  };
}
