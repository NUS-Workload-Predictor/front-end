export const MODULE_LIST_SET = "MODULE_LIST_SET";

export function setModuleList(moduleList) {
  return {
    type: MODULE_LIST_SET,
    payload: moduleList
  };
}
