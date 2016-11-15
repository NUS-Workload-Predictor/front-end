import React, { Component, PropTypes } from 'react';
import { Line } from 'react-chartjs';

const chartData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Recess Week", "Week 7", "Week 8", "Week 9", "Week 10", "Week 11", "Week 12", "Week 13", "Reading Week"],
  datasets: [{
    label: 'Working Time',
    data: [3.5, 4.2, 4.7, 7.2, 8.0, 12.0, 8.5, 14.2, 10.1, 11.3, 9.3, 9.0, 7.2, 9.0, 9.2],
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
        beginAtZero: false
      }
    }]
  }
};

class ModuleTimeLineChart extends Component {
  constructor(props) {
    super(props);
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
    for (let i = 0; i < module.assignments.length; i++) {
      let assignment = module.assignments[i];

      for (let j = assignment.releasedWeek - 1; j <= assignment.dueWeek; j++) {
        // Mistake here
        data[j] += assignment.coverage * (100 + assignment.percentage) / (100 * (assignment.dueWeek - assignment.releasedWeek));
      }
    }

    // Presentation
    for (let i = 0; i < module.presentations.length; i++) {
      let presentation = module.presentations[i];

      for (let j = presentation.releasedWeek - 1; j <= presentation.dueWeek; j++) {
        // Mistake here
        data[j] += presentation.people * presentation.coverage * (100 + presentation.percentage) / (100 * (presentation.dueWeek - presentation.releasedWeek));
      }
    }

    // Project
    for (let i = 0; i < module.projects.length; i++) {
      let project = module.projects[i];

      for (let j = project.releasedWeek - 1; j <= project.dueWeek; j++) {
        // Mistake here
        data[j] += project.people * project.coverage * (100 + project.percentage) / (100 * (project.dueWeek - project.releasedWeek));
      }
    }

    // Reading
    for (let i = 0; i < module.readings.length; i++) {
      let reading = module.readings[i];

      data[reading.week < 6 ? reading.week - 1 : reading.week] += reading.amount;
    }

    // Test
    for (let i = 0; i < module.tests.length; i++) {
      data[6] += 4;
    }

    // Exam
    for (let i = 0; i < module.exams.length; i++) {
      data[14] += 6;
    }

    return {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Recess Week", "Week 7", "Week 8", "Week 9", "Week 10", "Week 11", "Week 12", "Week 13", "Reading Week"],
      datasets: [{
        label: 'Working Time',
        data: data,
        borderWidth: 1
      }]
    };
  }

  render() {
    const { widget, modules } = this.props;
    const { width, height, moduleCode } = widget;

    const module = modules.reduce((x, y) => x.code === moduleCode ? x : y);

    const newChartData = this.createDataArray(module);
    const newChartOptions = {
      ...chartOptions,
      title: {
        display: chartOptions.title.display,
        text: 'Working Time Line-Chart for ' + moduleCode
      }
    };

    return (
      <Line data={newChartData} options={newChartOptions} width={width} height={height} />
    );
  }
}

ModuleTimeLineChart.propTypes = {

};

export default ModuleTimeLineChart;
