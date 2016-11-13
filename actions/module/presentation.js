export const PRESENTATION_ADD = "PRESENTATION_ADD";
export const PRESENTATION_EDIT = "PRESENTATION_EDIT";
export const PRESENTATION_DELETE = "PRESENTATION_DELETE";

export function addPresentation(moduleCode, presentation) {
  return {
    type: PRESENTATION_ADD,
    payload: {
      moduleCode: moduleCode,
      presentation: presentation
    }
  };
}

export function editPresentation(moduleCode, index, presentation) {
  return {
    type: PRESENTATION_EDIT,
    payload: {
      moduleCode: moduleCode,
      index: index,
      presentation: presentation
    }
  };
}

export function deletePresentation(moduleCode, index) {
  return {
    type: PRESENTATION_DELETE,
    payload: {
      moduleCode: moduleCode,
      index: index
    }
  };
}
