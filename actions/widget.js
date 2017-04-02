export const WIDGET_CHANGE = "WIDGET_CHANGE";

export const WIDGET_TIME_TABLE = 1;
export const WIDGET_MODULE_TIME_TABLE = 2;
export const WIDGET_MODULE_TIME_LINE_CHART = 3;
export const WIDGET_MODULE_TIME_PIE_CHART = 4;
export const WIDGET_DIFFICULTY_TABLE = 5;
export const WIDGET_MODULE_TIME_BAR_CHART = 6;

export function changeWidget(index) {
  return {
    type: WIDGET_CHANGE,
    payload: index
  };
}
