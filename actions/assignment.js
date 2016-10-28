export const ASSIGNMENT_ADD = "ASSIGNMENT_ADD";
export const ASSIGNMENT_EDIT = "ASSIGNMENT_EDIT";
export const ASSIGNMENT_DELETE = "ASSIGNMENT_DELETE";

export function addAssignment(assignment) {
  return {
    type: ASSIGNMENT_ADD,
    payload: assignment
  };
}

export function editAssignment(index, assignment) {
  return {
    type: ASSIGNMENT_EDIT,
    payload: {
      index: index,
      assignment: assignment
    }
  };
}

export function deleteAssignment(index) {
  return {
    type: ASSIGNMENT_DELETE,
    payload: index
  };
}
