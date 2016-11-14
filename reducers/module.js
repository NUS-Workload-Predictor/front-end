import { MODULE_ADD, MODULE_DELETE } from '../actions/module';
import { TEST_ADD, TEST_EDIT, TEST_DELETE } from '../actions/module/test';
import { READING_ADD, READING_EDIT, READING_DELETE } from '../actions/module/reading';
import { PROJECT_ADD, PROJECT_EDIT, PROJECT_DELETE } from '../actions/module/project';
import { PRESENTATION_ADD, PRESENTATION_EDIT, PRESENTATION_DELETE } from '../actions/module/presentation';
import { EXAM_ADD, EXAM_EDIT, EXAM_DELETE } from '../actions/module/exam';
import { ASSIGNMENT_ADD, ASSIGNMENT_EDIT, ASSIGNMENT_DELETE } from '../actions/module/assignment';
import test from './module/test';
import reading from './module/reading';
import project from './module/project';
import presentation from './module/presentation';
import exam from './module/exam';
import assignment from './module/assignment';

export default function modules(state = [], action) {
  switch (action.type) {
    case MODULE_ADD:
      const workload = action.payload.Workload.split('-').map(s => parseInt(s, 10));
      
      return [ ...state,
        {
          code: action.payload.ModuleCode,
          title: action.payload.ModuleTitle,
          credit: action.payload.ModuleCredit,
          prerequisites: action.payload.Prerequisite,
          workload: action.payload.Workload,
          lecture: workload[0],
          tutorial: workload[1],
          lab: workload[2],
          project: workload[3],
          preparation: workload[4],
          assignments: [],
          projects: [],
          presentations: [],
          readings: [],
          tests: [],
          exams: []
        }];

    case MODULE_DELETE:
      return [...state.slice(0, action.payload), ...state.slice(action.payload + 1)];

    case TEST_ADD:
    case TEST_EDIT:
    case TEST_DELETE:
      return state.map(m => test(m, action));

    case READING_ADD:
    case READING_EDIT:
    case READING_DELETE:
      return state.map(m => reading(m, action));

    case PROJECT_ADD:
    case PROJECT_EDIT:
    case PROJECT_DELETE:
      return state.map(m => project(m, action));

    case PRESENTATION_ADD:
    case PRESENTATION_EDIT:
    case PRESENTATION_DELETE:
      return state.map(m => presentation(m, action));

    case EXAM_ADD:
    case EXAM_EDIT:
    case EXAM_DELETE:
      return state.map(m => exam(m, action));

    case ASSIGNMENT_ADD:
    case ASSIGNMENT_EDIT:
    case ASSIGNMENT_DELETE:
      return state.map(m => assignment(m, action));

    default:
      return state;
  }
}
