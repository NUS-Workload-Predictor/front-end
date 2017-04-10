import { createStore } from 'redux';
import rootReducer from '../reducers/index'

const INITIAL_STATE = {
  modules: [
    {
      code: 'CS1010',
      title: 'Programming Methodology',
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
          releasedWeek: 3,
          due: '2016-11-10',
          dueWeek: 4,
          percentage: 5,
          coverage: 3,
          people: 1
        },
        {
          name: 'Assignment 2',
          released: '2016-11-11',
          releasedWeek: 5,
          due: '2016-11-20',
          dueWeek: 6,
          percentage: 5,
          coverage: 5,
          people: 1
        },
        {
          name: 'Assignment 3',
          released: '2016-11-11',
          releasedWeek: 7,
          due: '2016-11-20',
          dueWeek: 9,
          percentage: 5,
          coverage: 5,
          people: 1
        }
      ],

      projects: [
        {
          name: 'Project 1',
          released: '2016-10-26',
          releasedWeek: 5,
          due: '2016-11-08',
          dueWeek: 10,
          percentage: 5,
          coverage: 5,
          people: 4
        }
      ],
      presentations: [
        {
          name: 'Presentation 1',
          released: '2016-10-23',
          releasedWeek: 6,
          due: '2016-11-02',
          dueWeek: 12,
          percentage: 4,
          coverage: 4,
          people: 4,
          duration: 20
        }
      ],
      readings: [
        {
          name: 'Reading 1',
          week: 3,
          amount: 5,
          difficulty: 3
        }
      ],
      tests: [
        {
          name: 'Test 1',
          date: '2016-10-09',
          percentage: 10,
          coverage: 5,
          duration: 2
        }
      ],
      exams: [
        {
          name: 'Exam 1',
          date: '2016-11-29',
          percentage: 30,
          coverage: 10,
          duration: 2
        }
      ]
    }
  ],
  widgets: [
    {
      type: 1,
      display: true
    },
    {
      type: 2,
      display: false
    },
    {
      type: 3,
      display: false
    },
    {
      type: 6,
      display: false
    },
    {
      type: 4,
      display: false
    },
    {
      type: 5,
      display: false
    }
  ],
  moduleList: [],
  profile: {
    name: '',
    matricNo: '',
    cap: 0.0,
    experiencedMc: 0.0,
    experiencedSem: 0
  }
}

const store = createStore(rootReducer, INITIAL_STATE);

export default store;
