export const WIDGET_ADD = "WIDGET_ADD";
export const WIDGET_MOVE = "WIDGET_MOVE"
export const WIDGET_DELETE = "WIDGET_DELETE";

export const WIDGET_TIME_TABLE = 1;
export const WIDGET_MODULE_TIME_TABLE = 2;
export const WIDGET_MODULE_TIME_LINE_CHART = 3;
export const WIDGET_DIFFICULTY_TABLE = 4;

export function addWidget(widget) {
  return {
    type: WIDGET_ADD,
    payload: widget
  };
}

export function moveWidget(index, top, left) {
  return {
    type: WIDGET_MOVE,
    payload: {
      index: index,
      top: top,
      left: left
    }
  };
}

export function deleteWidget(index) {
  return {
    type: WIDGET_MOVE,
    payload: index
  };
}
