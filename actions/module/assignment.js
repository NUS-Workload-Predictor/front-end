export const ASSIGNMENT_ADD = "ASSIGNMENT_ADD";
export const ASSIGNMENT_EDIT = "ASSIGNMENT_EDIT";
export const ASSIGNMENT_DELETE = "ASSIGNMENT_DELETE";

export function addAssignment(moduleCode, assignment) {
  return {
    type: ASSIGNMENT_ADD,
    payload: {
      moduleCode: moduleCode,
      assignment: assignment
    }
  };
}

export function editAssignment(moduleCode, index, assignment) {
  return {
    type: ASSIGNMENT_EDIT,
    payload: {
      moduleCode: moduleCode,
      index: index,
      assignment: assignment
    }
  };
}

export function deleteAssignment(moduleCode, index) {
  return {
    type: ASSIGNMENT_DELETE,
    payload: {
      moduleCode: moduleCode,
      index: index
    }
  };
}
