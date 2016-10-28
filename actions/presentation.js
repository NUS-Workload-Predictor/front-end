export const PRESENTATION_ADD = "PRESENTATION_ADD";
export const PRESENTATION_EDIT = "PRESENTATION_EDIT";
export const PRESENTATION_DELETE = "PRESENTATION_DELETE";

export function addPresentation(presentation) {
  return {
    type: PRESENTATION_ADD,
    payload: presentation
  };
}

export function editPresentation(index, presentation) {
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
