import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, IconButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { TRAINING_SERVER_URL } from '../../constants/constants';

import '../../stylesheets/widget/ModuleTimeTable.scss';

const workloadSimpleApi = TRAINING_SERVER_URL + '/workload/simple/';
const workloadComplexApi = TRAINING_SERVER_URL + '/workload/complex/';

class ModuleTimeTable extends Component {
  constructor(props) {
    super(props);

    this.state = { data: {}, display: 1 };

    this.handleChange = this.handleChange.bind(this);
  }

  getAssignmentWorkloadDefault(assignment) {
    return (assignment.dueWeek - assignment.releasedWeek) * (assignment.coverage / 2.0) * assignment.people * (assignment.percentage / 5.0)
  }

  getProjectWorkloadDefault(project) {
    return ((project.dueWeek - project.releasedWeek) / 2.0) * project.coverage * (project.people / 4.0) * (project.percentage / 10.0);
  }

  getPresentationWorkloadDefault(presentation) {
    return (presentation.dueWeek - presentation.releasedWeek) * (presentation.coverage / 2.0) * (presentation.people / 4.0) * (presentation.percentage / 5.0) * (presentation.duration / 60.0);
  }

  getReadingWorkloadDefault(reading) {
    return reading.amount / 4.0;
  }

  getTestWorkloadDefault(test) {
    return (test.percentage / 10.0) * test.coverage * test.duration;
  }

  getExamWorkloadDefault(exam) {
    return (exam.percentage / 10.0) * exam.coverage * exam.duration;
  }

  getWorkloadParams(module, assessment) {
    let url = this.state.display > 0 ? workloadSimpleApi + assessment + '/' + module : workloadComplexApi + assessment + '/' + module;
    return fetch(url).then(function(response) {
      return response.json();
    });
  }

  createDataArray(module) {
    let data = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);
    let base = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);

    // Base time
    for (let i = 0; i < 15; i++) {
      base[i] += module.lecture + module.preparation;

      if (i > 1 && i < 14 && i !== 6) {
        base[i] += module.tutorial + module.lab + module.project;
      }
    }

    // Assignment
    let assignmentPromise = this.getWorkloadParams(module.code, 'assignment').then(function(coefficients) {
      let assignmentHours = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);

      for (let i = 0; i < module.assignments.length; i++) {
        let assignment = module.assignments[i];
        let temp = 0.0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getAssignmentWorkloadDefault(assignment);
        } else {
          temp = (assignment.dueWeek - assignment.releasedWeek) * coefficients.time
            + assignment.percentage * coefficients.percentage
            + assignment.coverage * coefficients.coverage
            + assignment.people * coefficients.people
            + coefficients.intercept;
        }

        for (let j = assignment.releasedWeek - 1; j <= assignment.dueWeek; j++) {
          assignmentHours[j] += temp;
        }
      }

      return assignmentHours;
    }.bind(this));

    // Presentation
    let presentationPromise = this.getWorkloadParams(module.code, 'presentation').then(function(coefficients) {
      let presentationHours = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);

      for (let i = 0; i < module.presentations.length; i++) {
        let presentation = module.presentations[i];
        let temp = 0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getPresentationWorkloadDefault(presentation);
        } else {
          temp = (presentation.dueWeek - presentation.releasedWeek) * coefficients.time
            + presentation.percentage * coefficients.percentage
            + presentation.coverage * coefficients.coverage
            + presentation.people * coefficients.people
            + presentation.duration * coefficients.duration
            + coefficients.intercept;
        }

        for (let j = presentation.releasedWeek - 1; j <= presentation.dueWeek; j++) {
          presentationHours[j] += temp;
        }
      }

      return presentationHours;
    }.bind(this));

    // Project
    let projectPromise = this.getWorkloadParams(module.code, 'project').then(function(coefficients) {
      let projectHours = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);

      for (let i = 0; i < module.projects.length; i++) {
        let project = module.projects[i];
        let temp = 0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getProjectWorkloadDefault(project);
        } else {
          temp = (project.dueWeek - project.releasedWeek) * coefficients.time
            + project.percentage * coefficients.percentage
            + project.coverage * coefficients.coverage
            + project.people * coefficients.people
            + coefficients.intercept;
        }

        for (let j = project.releasedWeek - 1; j <= project.dueWeek; j++) {
          projectHours[j] += temp;
        }
      }

      return projectHours;
    }.bind(this));

    // Reading
    let readingPromise = this.getWorkloadParams(module.code, 'reading').then(function(coefficients) {
      let readingHours = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);

      for (let i = 0; i < module.readings.length; i++) {
        let reading = module.readings[i];
        let temp = 0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getReadingWorkloadDefault(reading);
        } else {
          temp = reading.amount * coefficients.amount
            + reading.difficulty * coefficients.difficulty
            + coefficients.intercept;
        }

        readingHours[reading.week < 6 ? reading.week - 1 : reading.week] += temp;
      }

      return readingHours;
    }.bind(this));

    // Test
    let testPromise = this.getWorkloadParams(module.code, 'test').then(function(coefficients) {
      let testHours = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);

      for (let i = 0; i < module.tests.length; i++) {
        let test = module.tests[i];
        let temp = 0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getTestWorkloadDefault(test);
        } else {
          temp = test.percentage * coefficients.percentage
            + test.coverage * coefficients.coverage
            + test.duration * coefficients.duration
            + coefficients.intercept;
        }

        testHours[6] += temp;
      }

      return testHours;
    }.bind(this));

    // Exam
    let examPromise = this.getWorkloadParams(module.code, 'exam').then(function(coefficients) {
      let examHours = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);

      for (let i = 0; i < module.exams.length; i++) {
        let exam = module.exams[i];
        let temp = 0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getExamWorkloadDefault(exam);
        } else {
          temp = exam.percentage * coefficients.percentage
            + exam.coverage * coefficients.coverage
            + exam.duration * coefficients.duration
            + coefficients.intercept;
        }

        examHours[14] += temp;
      }

      return examHours;
    }.bind(this));

    return Promise.all([assignmentPromise, presentationPromise, projectPromise, readingPromise, testPromise, examPromise]).then(function(result) {
      for (let i = 0; i < data.length; i++) {
        data[i] += result.reduce((sum, array) => (sum + array[i]), 0) + base[i];
      }
      return data;
    }.bind(this));
  }

  componentDidMount() {
    const { widget, modules } = this.props;
    const { moduleCode } = widget;

    const module = modules.reduce((x, y) => x.code === moduleCode ? x : y);

    let data = {};
    data.total = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);
    let promiseList = modules.map((module) => (
      this.createDataArray(module).then((result) => {
        data[module.code] = result;
        result.map((value, i) => {
          data.total[i] += value;
        });
      })
    ));

    Promise.all(promiseList).then(() => {
      this.setState({ data: data });
    });
  }

  componentWillUpdate() {
    const { widget, modules } = this.props;
    const { moduleCode } = widget;

    const module = modules.reduce((x, y) => x.code === moduleCode ? x : y);

    let data = {};
    data.total = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);
    let promiseList = modules.map((module) => (
      this.createDataArray(module).then((result) => {
        data[module.code] = result;
        result.map((value, i) => {
          data.total[i] += value;
        });
      })
    ));

    Promise.all(promiseList).then(() => {
      // check if changes made
      let isChanged = JSON.stringify(data) !== JSON.stringify(this.state.data);
      if (isChanged) {
        this.setState({ data: data });
      }

    });
  }

  handleChange(event, index, value) {
    this.setState({ display: value });
  }

  render() {
    const { widget, modules } = this.props;
    const { data, display } = this.state;

    return (
      <div>
        <SelectField
          floatingLabelText="Selected Model"
          value={display}
          onChange={this.handleChange}
        >
          <MenuItem primaryText="Simple" value={1} />
          <MenuItem primaryText="Complex" value={-1} />
        </SelectField>
        <Table className="module-time-table" fixedHeader={true} selectable={false}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn className="module-cell">Module</TableHeaderColumn>
              <TableHeaderColumn>1</TableHeaderColumn>
              <TableHeaderColumn>2</TableHeaderColumn>
              <TableHeaderColumn>3</TableHeaderColumn>
              <TableHeaderColumn>4</TableHeaderColumn>
              <TableHeaderColumn>5</TableHeaderColumn>
              <TableHeaderColumn>6</TableHeaderColumn>
              <TableHeaderColumn>Recess</TableHeaderColumn>
              <TableHeaderColumn>7</TableHeaderColumn>
              <TableHeaderColumn>8</TableHeaderColumn>
              <TableHeaderColumn>9</TableHeaderColumn>
              <TableHeaderColumn>10</TableHeaderColumn>
              <TableHeaderColumn>11</TableHeaderColumn>
              <TableHeaderColumn>12</TableHeaderColumn>
              <TableHeaderColumn>13</TableHeaderColumn>
              <TableHeaderColumn>Reading</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
            showRowHover={false}
          >
            {modules.map((module, i) =>
              <TableRow key={i}>
                <TableRowColumn className="module-cell">{module.code}</TableRowColumn>
                {
                  data[module.code] ? data[module.code].map((value, i) => (
                    <TableRowColumn key={i}>{value.toFixed(2)}</TableRowColumn>
                  ))
                  : [...Array(15)].map((_, i) => (
                    <TableRowColumn key={i}>0</TableRowColumn>
                  ))
                }
              </TableRow>
            )}
            <TableRow>
              <TableRowColumn className="module-cell">Total</TableRowColumn>
              {
                data.total ? data.total.map((value, i) => (
                  <TableRowColumn key={i}>{value.toFixed(2)}</TableRowColumn>
                ))
                : [...Array(15)].map((_, i) => (
                  <TableRowColumn key={i}>0</TableRowColumn>
                ))
              }
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

ModuleTimeTable.propTypes = {

};

export default ModuleTimeTable;
