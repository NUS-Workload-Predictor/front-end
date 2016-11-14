import React, { Component, PropTypes } from 'react';
import { Line } from 'react-chartjs';

const chartData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Recess Week", "Week 7", "Week 8", "Week 9", "Week 10", "Week 11", "Week 12", "Week 13", "Reading Week"],
  datasets: [{
    label: 'Working Time',
    data: [3.5, 4.2, 4.7, 7.2, 8.0, 12.0, 8.5, 14.2, 10.1, 11.3, 9.3, 9.0, 7.2, 9.0, 9.2],
    // backgroundColor: [
    //   'rgba(255, 99, 132, 0.2)',
    //   'rgba(54, 162, 235, 0.2)',
    //   'rgba(255, 206, 86, 0.2)',
    //   'rgba(75, 192, 192, 0.2)',
    //   'rgba(153, 102, 255, 0.2)',
    //   'rgba(255, 159, 64, 0.2)'
    // ],
    // borderColor: [
    //   'rgba(255, 99, 132, 1)',
    //   'rgba(54, 162, 235, 1)',
    //   'rgba(255, 206, 86, 1)',
    //   'rgba(75, 192, 192, 1)',
    //   'rgba(153, 102, 255, 1)',
    //   'rgba(255, 159, 64, 1)'
    // ],
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

  render() {
    const { moduleCode, widget } = this.props;
    const { width, height } = widget;
    const newChartOptions = {
      ...chartOptions,
      title: {
        dispatch: chartOptions.title.display,
        text: 'Working Time Line-Chart for ' + moduleCode
      }
    };

    return (
      <Line data={chartData} options={newChartOptions} width={width} height={height} />
    );
  }
}

ModuleTimeLineChart.propTypes = {

};

export default ModuleTimeLineChart;
