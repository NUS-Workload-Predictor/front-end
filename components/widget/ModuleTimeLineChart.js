import React, { Component, PropTypes } from 'react';
import { Line } from 'react-chartjs';

import { TRAINING_SERVER_URL } from '../../constants/constants';

const workloadApi = TRAINING_SERVER_URL + '/workload/simple/';

const chartData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Recess Week", "Week 7", "Week 8", "Week 9", "Week 10", "Week 11", "Week 12", "Week 13", "Reading Week"],
  datasets: [{
    label: 'Working Time',
    data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    borderWidth: 1
  }]
};

const chartOptions = {
  title: {
    display: true,
    text: 'Working Time Line-Chart for CS1010'
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
};

class ModuleTimeLineChart extends Component {
  constructor(props) {
    super(props);

    this.state = { chartData: chartData, chartOptions: chartOptions };
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
    let url = workloadApi + assessment + '/' + module;
    return fetch(url).then(function(response) {
      return response.json();
    });
  }

  createDataArray(module) {
    let data = [];

    // Base time
    for (let i = 0; i < 15; i++) {
      let hours = module.lecture + module.preparation;

      if (i > 1 && i < 14 && i !== 6) {
        hours += module.tutorial + module.lab + module.project;
      }

      data.push(hours);
    }

    // Assignment
    let assignmentPromise = this.getWorkloadParams(module.code, 'assignment').then(function(coefficients) {
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
          data[j] += temp;
        }
      }
    }.bind(this));

    // Presentation
    let presentationPromise = this.getWorkloadParams(module.code, 'presentation').then(function(coefficients) {
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
          data[j] += temp;
        }
      }
    }.bind(this));

    // Project
    let projectPromise = this.getWorkloadParams(module.code, 'project').then(function(coefficients) {
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
          data[j] += temp;
        }
      }
    }.bind(this));

    // Reading
    let readingPromise = this.getWorkloadParams(module.code, 'reading').then(function(coefficients) {
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

        data[reading.week < 6 ? reading.week - 1 : reading.week] += temp;
      }
    }.bind(this));

    // Test
    let testPromise = this.getWorkloadParams(module.code, 'test').then(function(coefficients) {
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

        data[6] += temp;
      }
    }.bind(this));

    // Exam
    let examPromise = this.getWorkloadParams(module.code, 'exam').then(function(coefficients) {
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

        data[14] += temp;
      }
    }.bind(this));

    return Promise.all([assignmentPromise, presentationPromise, projectPromise, readingPromise, testPromise, examPromise]).then(function() {
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].toFixed(2);
      }

      this.setState({
        chartData: {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Recess Week", "Week 7", "Week 8", "Week 9", "Week 10", "Week 11", "Week 12", "Week 13", "Reading Week"],
          datasets: [{
            label: 'Working Time',
            data: data,
            borderWidth: 1
          }]
        }
      });
    }.bind(this));
  }

  componentDidMount() {
    const { widget, modules } = this.props;
    const { moduleCode } = widget;

    const module = modules.reduce((x, y) => x.code === moduleCode ? x : y);
    this.createDataArray(module);
  }

  render() {
    const { widget, modules } = this.props;

    // const newChartData = this.createDataArray(module);
    const newChartData = this.state.chartData;
    const newChartOptions = {
      ...this.state.chartOptions,
      title: {
        display: this.state.chartOptions.title.display,
        // text: 'Working Time Line-Chart for ' + moduleCode
        text: 'Working Time Line-Chart for CS1010'
      }
    };

    return (
      <Line data={newChartData} options={newChartOptions} />
    );
  }
}

ModuleTimeLineChart.propTypes = {

};

export default ModuleTimeLineChart;
