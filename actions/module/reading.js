export const READING_ADD = "READING_ADD";
export const READING_EDIT = "READING_EDIT";
export const READING_DELETE = "READING_DELETE";

export function addReading(reading) {
  return {
    type: READING_ADD,
    payload: reading
  };
}

export function editReading(index, reading) {
  return {
    type: READING_EDIT,
    payload: {
      index: index,
      reading: reading
    }
  };
}

export function deleteReading(index) {
  return {
    type: READING_DELETE,
    payload: index
  };
}
