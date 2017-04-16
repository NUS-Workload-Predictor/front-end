import { TIME_TABLE_ADD } from '../actions/timeTable';

function parseTimeSlot(time) {
  let temp = parseInt(time.substr(0, 2));

  if (time.substr(2) === '00') {
    return temp * 2;
  } else {
    return temp * 2 + 1;
  }
}

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TIME_TABLE_ADD:
      const timetable = action.payload ? action.payload.map((m) => {
        return {
          info: m.ModuleCode + ' ' + m.LessonType,
          day: parseInt(m.DayCode),
          time: [
            parseTimeSlot(m.StartTime),
            parseTimeSlot(m.EndTime)
          ]
        };
      }) : [];
      
      return timetable;

    default:
      return state;
  }
}
