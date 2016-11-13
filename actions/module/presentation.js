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
      index: index,
      presentation: presentation
    }
  };
}

export function deletePresentation(index) {
  return {
    type: PRESENTATION_DELETE,
    payload: index
  };
}
