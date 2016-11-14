export const MODULE_ADD = "MODULE_ADD";
export const MODULE_DELETE = "MODULE_DELETE";

export function addModule(module) {
  return {
    type: MODULE_ADD,
    payload: module
  };
}

export function deleteModule(index) {
  return {
    type: MODULE_DELETE,
    payload: index
  };
}
