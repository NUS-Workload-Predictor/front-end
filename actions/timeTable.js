export const TIME_TABLE_ADD = "TIME_TABLE_ADD";

export function addTimeTable(timetable) {
  return {
    type: TIME_TABLE_ADD,
    payload: timetable
  };
}
