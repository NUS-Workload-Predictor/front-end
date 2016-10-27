import { createStore } from 'redux';
import rootReducer from '../reducers/index'

const INITIAL_STATE = {
  modules: [
    {
      code: 'CS1010',
      credit: '4',
      level: '1',
      prerequisites: [],
      lecture: 2,
      tutorial: 1,
      lab: 1,
      project: 3,
      preparation: 3,

      assignments: [
        {
          name: 'Assignment 1',
          released: '2016-11-01',
          due: '2016-11-10',
          percentage: 5,
          coverage: 3,
          people: 1
        },
        {
          name: 'Assignment 2',
          released: '2016-11-11',
          due: '2016-11-20',
          percentage: 5,
          coverage: 5,
          people: 1
        }
      ],

      projects: [],
      presentations: [],
      readings: [],
      tests: [],
      exams: []
    }
  ],
  widgets: []
}

const store = createStore(rootReducer, INITIAL_STATE);

export default store;
