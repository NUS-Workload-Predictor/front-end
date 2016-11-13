export const TEST_ADD = "TEST_ADD";
export const TEST_EDIT = "TEST_EDIT";
export const TEST_DELETE = "TEST_DELETE";

export function addTest(moduleCode, test) {
  return {
    type: TEST_ADD,
    payload: {
      moduleCode: moduleCode,
      test: test
    }
  };
}

export function editTest(moduleCode, index, test) {
  return {
    type: TEST_EDIT,
    payload: {
      index: index,
      test: test
    }
  };
}

export function deleteTest(moduleCode, index) {
  return {
    type: TEST_DELETE,
    payload: {
      moduleCode: moduleCode,
      index: index
    }
  };
}
