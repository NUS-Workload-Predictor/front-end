export const WIDGET_CHANGE = "WIDGET_CHANGE";

export const WIDGET_TIME_TABLE = 1;
export const WIDGET_MODULE_TIME_TABLE = 2;
export const WIDGET_MODULE_TIME_LINE_CHART = 3;
export const WIDGET_DIFFICULTY_TABLE = 4;

export function changeWidget(index) {
  return {
    type: WIDGET_CHANGE,
    payload: index
  };
}
