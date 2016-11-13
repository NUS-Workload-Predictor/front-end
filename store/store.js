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
        // {
        //   name: 'Assignment 1',
        //   released: '2016-11-01',
        //   due: '2016-11-10',
        //   percentage: 5,
        //   coverage: 3,
        //   people: 1
        // },
        // {
        //   name: 'Assignment 2',
        //   released: '2016-11-11',
        //   due: '2016-11-20',
        //   percentage: 5,
        //   coverage: 5,
        //   people: 1
        // }
      ],

      projects: [
        // {
        //   name: 'Project 1',
        //   released: '2016-10-26',
        //   due: '2016-11-08',
        //   percentage: 5,
        //   coverage: 5,
        //   people: 4
        // }
      ],
      presentations: [
        // {
        //   name: 'Presentation 1',
        //   released: '2016-10-23',
        //   due: '2016-11-02',
        //   percentage: 4,
        //   coverage: 4,
        //   people: 4,
        //   duration: 20
        // }
      ],
      readings: [
        // {
        //   name: 'Reading 1',
        //   week: 3,
        //   amount: 10,
        //   difficulty: 3
        // }
      ],
      tests: [],
      exams: [
        // {
        //   name: 'Exam 1',
        //   date: '2016-11-29',
        //   percentage: 30,
        //   coverage: 10,
        //   duration: 2
        // }
      ]
    }
  ],
  widgets: []
}

const store = createStore(rootReducer, INITIAL_STATE);

export default store;
