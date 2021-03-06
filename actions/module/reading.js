export const READING_ADD = "READING_ADD";
export const READING_EDIT = "READING_EDIT";
export const READING_DELETE = "READING_DELETE";

export function addReading(moduleCode, reading) {
  return {
    type: READING_ADD,
    payload: {
      moduleCode: moduleCode,
      reading: reading
    }
  };
}

export function editReading(moduleCode, index, reading) {
  return {
    type: READING_EDIT,
    payload: {
      moduleCode: moduleCode,
      index: index,
      reading: reading
    }
  };
}

export function deleteReading(moduleCode, index) {
  return {
    type: READING_DELETE,
    payload: {
      moduleCode: moduleCode,
      index: index
    }
  };
}
