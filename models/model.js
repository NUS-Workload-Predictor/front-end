module = {
  code: MODULE_CODE,
  credit: MODULE_CREDIT,
  level: MODULE_LEVEL,
  prerequisites: [],
  lecture: MODULE_WEEKLY_LECTURE_HOUR,
  tutorial: MODULE_WEEKLY_TUTORIAL_HOUR,
  lab: MODULE_WEEKLY_LAB_HOUR,
  project: MODULE_WEEKLY_PROJECT_HOUR,
  preparation: MODULE_WEEKLY_PREPARATION_HOUR,

  // Probably unknown
  assignments: [],
  projects: [],
  presentations: [],
  readings: [],
  tests: [],
  exams: []
}

prequisite = MODULE_CODE

// weekly: ASSIGNMENT_IS_WEEKLY
// weeks: []
assignment = {
  name: ASSIGNMENT_NAME,
  released: ASSIGNMENT_RELEASED_DATE,
  due: ASSIGNMENT_DUE_DATE,
  percentage: ASSIGNMENT_PERCENTAGE,
  coverage: ASSIGNMENT_COVERED_LECTURE_AMOUNT,
  people: ASSIGNMENT_INVOLVED_PEOPLE_AMOUNT
}

project = {
  name: PROJECT_NAME,
  released: PROJECT_RELEASED_DATE,
  due: PROJECT_DUE_DATE,
  percentage: PROJECT_PERCENTAGE,
  coverage: PROJECT_COVERED_LECTURE_AMOUNT,
  people: PROJECT_INVOLVED_PEOPLE_AMOUNT
}

presentation = {
  name: PRESENTATION_NAME,
  released: PRESENTATION_RELEASED_DATE,
  due: PRESENTATION_DUE_DATE,
  percentage: PRESENTATION_PERCENTAGE,
  coverage: PRESENTATION_COVERED_LECTURE_AMOUNT,
  people: PRESENTATION_INVOLVED_PEOPLE_AMOUNT,
  duration: PRESENTATION_DURATION
}

// weekly: READING_IS_WEEKLY
// weeks: []
reading = {
  name: READING_NAME,
  week: READING_WEEK_NUMBER
  amount: READING_AMOUNT,
  difficulty: READING_DIFFICULTY
}

test = {
  name: TEST_NAME,
  date: TEST_DATE,
  percentage: TEST_PERCENTAGE,
  coverage: TEST_COVERED_LECTURE_AMOUNT,
  duration: TEST_DURATION
}

exam = {
  name: EXAM_NAME,
  date: EXAM_DATE,
  percentage: EXAM_PERCENTAGE,
  coverage: EXAM_COVERED_LECTURE_AMOUNT,
  duration: EXAM_DURATION
}

widget = {
  type: WIDGET_TYPE,
  left: WIDGET_LEFT,
  top: WIDGET_TOP,
  width: WIDGET_WIDTH,
  height: WIDGET_HEIGHT,

  // Optional
  moduleCode: MODULE_CODE

  }
}
