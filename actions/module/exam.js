export const EXAM_ADD = "EXAM_ADD";
export const EXAM_EDIT = "EXAM_EDIT";
export const EXAM_DELETE = "EXAM_DELETE";

export function addExam(moduleCode, exam) {
  return {
    type: EXAM_ADD,
    payload: {
      moduleCode: moduleCode,
      exam: exam
    }
  };
}

export function editExam(moduleCode, index, exam) {
  return {
    type: EXAM_EDIT,
    payload: {
      index: index,
      exam: exam
    }
  };
}

export function deleteExam(moduleCode, index) {
  return {
    type: EXAM_DELETE,
    payload: {
      moduleCode: moduleCode,
      index: index
    }
  };
}
