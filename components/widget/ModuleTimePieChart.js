import React, { Component, PropTypes } from 'react';
import { Pie } from 'react-chartjs';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import { TRAINING_SERVER_URL } from '../../constants/constants';

const workloadSimpleApi = TRAINING_SERVER_URL + '/workload/simple/';
const workloadComplexApi = TRAINING_SERVER_URL + '/workload/complex/';

const chartModuleData = {
  labels: ["Base", "Assignment", "Presentation", "Project", "Reading", "Test", "Exam"],
  datasets: [{
    label: 'Working Time',
    data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    backgroundColor: [
      "#23b4de",
      "#810439",
      "#bd0950",
      "#972b9e",
      "#2eb567",
      "#a4f4ec",
      "#b751a9",
      // "#8716df",
      // "#378fd3",
      // "#568cc2",
      // "#fda99e",
      // "#41e2b1",
      // "#ff6384",
      // "#36a2eb",
      // "#ffce56"
    ],
    hoverBackgroundColor: [
      "#13a4ce",
      "#710029",
      "#ad0040",
      "#871b8e",
      "#1ea557",
      "#94e4dc",
      "#a74199",
      // "#7706cf",
      // "#277fc3",
      // "#467cb2",
      // "#ed998e",
      // "#31d2a1",
      // "#ef5374",
      // "#2692db",
      // "#efbe46"
    ]
  }]
};

const chartOptions = {
  title: {
    display: true,
    text: 'Working Time Pie Chart'
  }
};

const colors = [
  "#23b4de",
  "#810439",
  "#bd0950",
  "#972b9e",
  "#2eb567",
  "#a4f4ec",
  "#b751a9",
  "#8716df",
  "#378fd3",
  "#568cc2",
  "#fda99e",
  "#41e2b1",
  "#ff6384",
  "#36a2eb",
  "#ffce56"
];

const hoverColors = [
  "#13a4ce",
  "#710029",
  "#ad0040",
  "#871b8e",
  "#1ea557",
  "#94e4dc",
  "#a74199",
  "#7706cf",
  "#277fc3",
  "#467cb2",
  "#ed998e",
  "#31d2a1",
  "#ef5374",
  "#2692db",
  "#efbe46"
];

class ModuleTimePieChart extends Component {
  constructor(props) {
    super(props);

    this.state = { chartData: {}, chartOptions: chartOptions, display: this.props.modules.length + 1, data: {} };

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

  getWorkloadParams(module, assessment, display) {
    let url = this.state.display > 0 ? workloadSimpleApi + assessment + '/' + module : workloadComplexApi + assessment + '/' + module;
    if (display !== undefined) {
      url = display > 0 ? workloadSimpleApi + assessment + '/' + module : workloadComplexApi + assessment + '/' + module;
    }
    return fetch(url).then(function(response) {
      return response.json();
    });
  }

  createDataArray(module, display) {
    let data = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);
    let base = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);
    const { profile } = this.props;

    // Base time
    for (let i = 0; i < 15; i++) {
      base[i] += module.lecture + module.preparation;

      if (i > 1 && i < 14 && i !== 6) {
        base[i] += module.tutorial + module.lab + module.project;
      }
    }

    // Assignment
    let assignmentPromise = this.getWorkloadParams(module.code, 'assignment', display).then(function(coefficients) {
      let assignmentHours = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);

      for (let i = 0; i < module.assignments.length; i++) {
        let assignment = module.assignments[i];
        let temp = 0.0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getAssignmentWorkloadDefault(assignment);
        } else {
          if (coefficients.cap) {
            temp = (assignment.dueWeek - assignment.releasedWeek) * coefficients.time
              + assignment.percentage * coefficients.percentage
              + assignment.coverage * coefficients.coverage
              + assignment.people * coefficients.people
              + profile.cap * coefficients.cap
              + profile.experiencedSem * coefficients.semesters
              + profile.experiencedMc * coefficients.credits
              + coefficients.intercept;
          } else {
            temp = (assignment.dueWeek - assignment.releasedWeek) * coefficients.time
              + assignment.percentage * coefficients.percentage
              + assignment.coverage * coefficients.coverage
              + assignment.people * coefficients.people
              + coefficients.intercept;
          }
        }

        for (let j = assignment.releasedWeek - 1; j <= assignment.dueWeek; j++) {
          assignmentHours[j] += temp;
        }
      }

      return assignmentHours;
    }.bind(this));

    // Presentation
    let presentationPromise = this.getWorkloadParams(module.code, 'presentation', display).then(function(coefficients) {
      let presentationHours = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);

      for (let i = 0; i < module.presentations.length; i++) {
        let presentation = module.presentations[i];
        let temp = 0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getPresentationWorkloadDefault(presentation);
        } else {
          if (coefficients.cap) {
            temp = (presentation.dueWeek - presentation.releasedWeek) * coefficients.time
              + presentation.percentage * coefficients.percentage
              + presentation.coverage * coefficients.coverage
              + presentation.people * coefficients.people
              + presentation.duration * coefficients.duration
              + profile.cap * coefficients.cap
              + profile.experiencedSem * coefficients.semesters
              + profile.experiencedMc * coefficients.credits
              + coefficients.intercept;
          } else {
            temp = (presentation.dueWeek - presentation.releasedWeek) * coefficients.time
              + presentation.percentage * coefficients.percentage
              + presentation.coverage * coefficients.coverage
              + presentation.people * coefficients.people
              + presentation.duration * coefficients.duration
              + coefficients.intercept;
          }
        }

        for (let j = presentation.releasedWeek - 1; j <= presentation.dueWeek; j++) {
          presentationHours[j] += temp;
        }
      }

      return presentationHours;
    }.bind(this));

    // Project
    let projectPromise = this.getWorkloadParams(module.code, 'project', display).then(function(coefficients) {
      let projectHours = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);

      for (let i = 0; i < module.projects.length; i++) {
        let project = module.projects[i];
        let temp = 0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getProjectWorkloadDefault(project);
        } else {
          if (coefficients.cap) {
            temp = (project.dueWeek - project.releasedWeek) * coefficients.time
              + project.percentage * coefficients.percentage
              + project.coverage * coefficients.coverage
              + project.people * coefficients.people
              + profile.cap * coefficients.cap
              + profile.experiencedSem * coefficients.semesters
              + profile.experiencedMc * coefficients.credits
              + coefficients.intercept;
          } else {
            temp = (project.dueWeek - project.releasedWeek) * coefficients.time
              + project.percentage * coefficients.percentage
              + project.coverage * coefficients.coverage
              + project.people * coefficients.people
              + coefficients.intercept;
          }
        }

        for (let j = project.releasedWeek - 1; j <= project.dueWeek; j++) {
          projectHours[j] += temp;
        }
      }

      return projectHours;
    }.bind(this));

    // Reading
    let readingPromise = this.getWorkloadParams(module.code, 'reading', display).then(function(coefficients) {
      let readingHours = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);

      for (let i = 0; i < module.readings.length; i++) {
        let reading = module.readings[i];
        let temp = 0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getReadingWorkloadDefault(reading);
        } else {
          if (coefficients.cap) {
            temp = reading.amount * coefficients.amount
              + profile.cap * coefficients.cap
              + profile.experiencedSem * coefficients.semesters
              + profile.experiencedMc * coefficients.credits
              + coefficients.intercept;
          } else {
            temp = reading.amount * coefficients.amount
              + coefficients.intercept;
          }
        }

        readingHours[reading.week < 6 ? reading.week - 1 : reading.week] += temp;
      }

      return readingHours;
    }.bind(this));

    // Test
    let testPromise = this.getWorkloadParams(module.code, 'test', display).then(function(coefficients) {
      let testHours = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);

      for (let i = 0; i < module.tests.length; i++) {
        let test = module.tests[i];
        let temp = 0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getTestWorkloadDefault(test);
        } else {
          if (coefficients.cap) {
            temp = test.percentage * coefficients.percentage
              + test.coverage * coefficients.coverage
              + test.duration * coefficients.duration
              + profile.cap * coefficients.cap
              + profile.experiencedSem * coefficients.semesters
              + profile.experiencedMc * coefficients.credits
              + coefficients.intercept;
          } else {
            temp = test.percentage * coefficients.percentage
              + test.coverage * coefficients.coverage
              + test.duration * coefficients.duration
              + coefficients.intercept;
          }
        }

        testHours[6] += temp;
      }

      return testHours;
    }.bind(this));

    // Exam
    let examPromise = this.getWorkloadParams(module.code, 'exam', display).then(function(coefficients) {
      let examHours = Array.apply(null, Array(15)).map(Number.prototype.valueOf, 0);

      for (let i = 0; i < module.exams.length; i++) {
        let exam = module.exams[i];
        let temp = 0;

        if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
          temp = this.getExamWorkloadDefault(exam);
        } else {
          if (coefficients.cap) {
            temp = exam.percentage * coefficients.percentage
              + exam.coverage * coefficients.coverage
              + exam.duration * coefficients.duration
              + profile.cap * coefficients.cap
              + profile.experiencedSem * coefficients.semesters
              + profile.experiencedMc * coefficients.credits
              + coefficients.intercept;
          } else {
            temp = exam.percentage * coefficients.percentage
              + exam.coverage * coefficients.coverage
              + exam.duration * coefficients.duration
              + coefficients.intercept;
          }
        }

        examHours[14] += temp;
      }

      return examHours;
    }.bind(this));

    return Promise.all([assignmentPromise, presentationPromise, projectPromise, readingPromise, testPromise, examPromise]).then(function(result) {
      let workingTime = {};
      workingTime[module.code] = {};

      for (let i = 0; i < data.length; i++) {
        data[i] += result.reduce((sum, array) => (sum + array[i]), 0) + base[i];
      }

      workingTime[module.code].assignment = result[0];
      workingTime[module.code].presentation = result[1];
      workingTime[module.code].project = result[2];
      workingTime[module.code].reading = result[3];
      workingTime[module.code].test = result[4];
      workingTime[module.code].exam = result[5];

      workingTime[module.code].total = data;
      workingTime[module.code].base = base;

      return workingTime;
    }.bind(this));
  }

  componentDidMount() {
    const { modules } = this.props;

    let promiseList = modules.map((module) => (
      this.createDataArray(module)
    ));

    let data = [];
    Promise.all(promiseList).then((result) => {
      let workingTime = result.reduce((sum, obj) => (Object.assign(sum, obj)), {});

      Object.keys(workingTime).forEach((m, i) => {
        data.push(workingTime[m].total.reduce((sum, value) => (sum + value), 0.0));
      });

      this.setState({
        chartData: {
          labels: modules.map((m, i) => (m.code)),
          datasets: [{
            label: 'Working Time',
            data: data,
            backgroundColor: colors,
            hoverBackgroundColor: hoverColors
          }]
        },
        display: modules.length + 1,
        data: workingTime
      });
    });
  }

  componentWillUpdate(nextProp, nextState) {
    const { modules } = this.props;

    let promiseList = modules.map((module) => (
      this.createDataArray(module, nextState.display)
    ));

    let data = [];
    Promise.all(promiseList).then((result) => {
      if (modules.length + 1 <= Math.abs(this.state.display)) {
        let workingTime = result.reduce((sum, obj) => (Object.assign(sum, obj)), {});
        Object.keys(workingTime).forEach((m, i) => {
          data.push(workingTime[m].total.reduce((sum, value) => (sum + value), 0.0));
        });
        let isChanged = false;
        for (let i = 0; i < data.length; i++) {
          if (data[i] !== this.state.chartData.datasets[0].data[i]) {
            isChanged = true;
            break;
          }
        }

        if (isChanged) {
          this.setState({
            chartData: {
              labels: modules.map((m, i) => (m.code)),
              datasets: [{
                label: 'Working Time',
                data: data,
                backgroundColor: colors,
                hoverBackgroundColor: hoverColors
              }]
            },
            display: nextState.display,
            data: workingTime
          });
        }
      } else {
        let workingTime = result.reduce((sum, obj) => (Object.assign(sum, obj)), {});
        let module = modules[Math.abs(this.state.display) - 1].code;
        let moduleData = result[Math.abs(this.state.display) - 1][module];

        Object.keys(moduleData).forEach((a, i) => {
          if (a !== 'total') {
            data.push(moduleData[a].reduce((sum, value) => (sum + value), 0.0));
          }
        });

        let keys = Object.keys(moduleData).filter((a) => (a !== 'total'));

        let isChanged = false;
        for (let i = 0; i < data.length; i++) {
          if (data[i] !== this.state.chartData.datasets[0].data[i]) {
            isChanged = true;
            break;
          }
        }

        if (isChanged) {
          this.setState({
            chartData: {
              labels: keys,
              datasets: [{
                label: 'Working Time',
                data: data,
                backgroundColor: colors,
                hoverBackgroundColor: hoverColors
              }]
            },
            display: this.state.display,
            data: workingTime
          });
        }
      }
    });
  }

  handleChange(event, index, value) {
    this.setState({ display: value });
  }

  render() {
    const { widget, modules } = this.props;

    const { chartData, chartOptions, display, data } = this.state;

    return (
      <div>
        <SelectField
          floatingLabelText="Selected Module"
          value={display}
          onChange={this.handleChange}
        >
          <MenuItem primaryText="Simple" disabled={true} />
          <MenuItem value={modules.length + 1} primaryText="All" />
          {modules.map((module, i) => (
            <MenuItem key={i + 1} value={i + 1} primaryText={module.code} />
          ))}
          <Divider />
          <MenuItem primaryText="Complex" disabled={true} />
          <MenuItem value={-(modules.length + 1)} primaryText="All" />
          {modules.map((module, i) => (
            <MenuItem key={-(i + 1)} value={-(i + 1)} primaryText={module.code} />
          ))}
        </SelectField>
        <Pie data={chartData} options={chartOptions} height="120" />
      </div>
    );
  }
}

ModuleTimePieChart.propTypes = {

};

export default ModuleTimePieChart;
