import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, IconButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';

import { TRAINING_SERVER_URL } from '../../constants/constants';

const difficultyApi = TRAINING_SERVER_URL + '/difficulty/';

class DifficultyTable extends Component {
  constructor(props) {
    super(props);

    let difficulty = [];
    for (let i = 0; i < props.modules.length; i++) {
      difficulty.push(0.0);
    }
    this.state = { difficulty: difficulty };
  }

  getAssignmentDifficultyDefault(assignment) {
    return assignment.coverage * (100 + assignment.percentage) / (100 * (assignment.dueWeek - assignment.releasedWeek));
  }

  getProjectDifficultyDefault(project) {
    return project.people * project.coverage * (100 + project.percentage) / (100 * (project.dueWeek - project.releasedWeek));
  }

  getPresentationDifficultyDefault(presentation) {
    return presentation.people * presentation.coverage * (100 + presentation.percentage) / (100 * (presentation.dueWeek - presentation.releasedWeek));
  }

  getReadingDifficultyDefault(reading) {
    return reading.amount / reading.difficulty;
  }

  getTestDifficultyDefault(test) {
    return 4;
  }

  getExamDifficultyDefault(exam) {
    return 6;
  }

  getDifficultyParams(module, assessment) {
    let url = difficultyApi + assessment + '/' + module;
    return fetch(url).then(function(response) {
      return response.json();
    });
  }

  getDifficulty(module, index) {
    let difficulty = 0.0;

    // Base difficulty
    for (let i = 0; i < module.code.length; i++) {
      if (!isNaN(parseInt(module.code[i]))) {
        difficulty += parseInt(module.code[i]);
        break;
      }
    }

    // Assignment
    let assignmentPromise = this.getDifficultyParams(module.code, 'assignment').then(function(coefficients) {
      for (let i = 0; i < module.assignments.length; i++) {
        let assignment = module.assignments[i];
        let temp = 0.0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getAssignmentDifficultyDefault(assignment);
        } else {
          temp = (assignment.dueWeek - assignment.releasedWeek) * coefficients.time
            + assignment.percentage * coefficients.percentage
            + assignment.coverage * coefficients.coverage
            + assignment.people * coefficients.people
            + coefficients.intercept;
        }

        difficulty += temp;
      }
    }.bind(this));

    // Presentation
    let presentationPromise = this.getDifficultyParams(module.code, 'presentation').then(function(coefficients) {
      for (let i = 0; i < module.presentations.length; i++) {
        let presentation = module.presentations[i];
        let temp = 0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getPresentationDifficultyDefault(presentation);
        } else {
          temp = (presentation.dueWeek - presentation.releasedWeek) * coefficients.time
            + presentation.percentage * coefficients.percentage
            + presentation.coverage * coefficients.coverage
            + presentation.people * coefficients.people
            + presentation.duration * coefficients.duration
            + coefficients.intercept;
        }

        difficulty += temp;
      }
    }.bind(this));

    // Project
    let projectPromise = this.getDifficultyParams(module.code, 'project').then(function(coefficients) {
      for (let i = 0; i < module.projects.length; i++) {
        let project = module.projects[i];
        let temp = 0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getProjectDifficultyDefault(project);
        } else {
          temp = (project.dueWeek - project.releasedWeek) * coefficients.time
            + project.percentage * coefficients.percentage
            + project.coverage * coefficients.coverage
            + project.people * coefficients.people
            + coefficients.intercept;
        }

        difficulty += temp;
      }
    }.bind(this));

    // Reading
    let readingPromise = this.getDifficultyParams(module.code, 'reading').then(function(coefficients) {
      for (let i = 0; i < module.readings.length; i++) {
        let reading = module.readings[i];
        let temp = 0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getReadingDifficultyDefault(reading);
        } else {
          temp = reading.amount * coefficients.amount
            + reading.difficulty * coefficients.difficulty
            + coefficients.intercept;
        }

        difficulty += temp;
      }
    }.bind(this));

    // Test
    let testPromise = this.getDifficultyParams(module.code, 'test').then(function(coefficients) {
      for (let i = 0; i < module.tests.length; i++) {
        let test = module.tests[i];
        let temp = 0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getTestDifficultyDefault(test);
        } else {
          temp = test.percentage * coefficients.percentage
            + test.coverage * coefficients.coverage
            + test.duration * coefficients.duration
            + coefficients.intercept;
        }

        difficulty += temp;
      }
    }.bind(this));

    // Exam
    let examPromise = this.getDifficultyParams(module.code, 'exam').then(function(coefficients) {
      for (let i = 0; i < module.exams.length; i++) {
        let exam = module.exams[i];
        let temp = 0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getExamDifficultyDefault(exam);
        } else {
          temp = exam.percentage * coefficients.percentage
            + exam.coverage * coefficients.coverage
            + exam.duration * coefficients.duration
            + coefficients.intercept;
        }

        difficulty += temp;
      }
    }.bind(this));

    return Promise.all([assignmentPromise, presentationPromise, projectPromise, readingPromise, testPromise, examPromise]).then(function() {
      difficulty = difficulty.toFixed(2);

      return difficulty;
    }.bind(this));
  }

  componentDidMount() {
    const { modules } = this.props;
    let difficultyList = [];

    modules.reduce((promise, module, index) => {
      return promise.then(() => {
        return this.getDifficulty(module, index).then((difficulty) => {
          difficultyList[index] = difficulty;
        });
      });
    }, Promise.resolve()).then(
      () => {
        this.setState({ difficulty: difficultyList });
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    const { modules } = nextProps;
    let difficultyList = [];

    modules.reduce((promise, module, index) => {
      return promise.then(() => {
        return this.getDifficulty(module, index).then((difficulty) => {
          difficultyList[index] = difficulty;
        });
      });
    }, Promise.resolve()).then(
      () => {
        this.setState({ difficulty: difficultyList });
      }
    );
  }

  render() {
    const { widget, modules } = this.props;
    const { difficulty } = this.state;

    return (
      <Table fixedHeader={true} selectable={false}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>No</TableHeaderColumn>
            <TableHeaderColumn>Module</TableHeaderColumn>
            <TableHeaderColumn>Simple Est.</TableHeaderColumn>
            <TableHeaderColumn>Complex Est.</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          deselectOnClickaway={false}
          showRowHover={false}
        >
          {modules.map((module, i) =>
            <TableRow key={i}>
              <TableRowColumn>{i + 1}</TableRowColumn>
              <TableRowColumn>{module.code}</TableRowColumn>
              <TableRowColumn>{difficulty[i]}</TableRowColumn>
              <TableRowColumn>{difficulty[i]}</TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}

DifficultyTable.propTypes = {

};

export default DifficultyTable;
