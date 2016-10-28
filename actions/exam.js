export const EXAM_ADD = "EXAM_ADD";
export const EXAM_EDIT = "EXAM_EDIT";
export const EXAM_DELETE = "EXAM_DELETE";

export function addExam(exam) {
  return {
    type: EXAM_ADD,
    payload: exam
  };
}

export function editExam(index, exam) {
  return {
    type: EXAM_EDIT,
    payload: {
      index: index,
      exam: exam
    }
  };
}

export function deleteExam(index) {
  return {
    type: EXAM_DELETE,
    payload: index
  };
}
