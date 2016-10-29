export const TEST_ADD = "TEST_ADD";
export const TEST_EDIT = "TEST_EDIT";
export const TEST_DELETE = "TEST_DELETE";

export function addTest(test) {
  return {
    type: TEST_ADD,
    payload: test
  };
}

export function editTest(index, test) {
  return {
    type: TEST_EDIT,
    payload: {
      index: index,
      test: test
    }
  };
}

export function deleteTest(index) {
  return {
    type: TEST_DELETE,
    payload: index
  };
}
