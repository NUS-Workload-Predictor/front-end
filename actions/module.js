export const MODULE_ADD = "MODULE_ADD";
export const MODULE_EDIT = "MODULE_EDIT";
export const MODULE_DELETE = "MODULE_DELETE";

export function addModule(code) {
  return {
    type: MODULE_ADD,
    payload: code
  };
}

export function editModule(info) {
  return {
    type: MODULE_EDIT,
    payload: info
  };
}

export function deleteModule(code) {
  return {
    type: MODULE_DELETE,
    payload: code
  };
}
