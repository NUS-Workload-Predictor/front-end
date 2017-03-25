import React, { Component, PropTypes } from 'react';
import { Pie } from 'react-chartjs';

const chartData = {
  labels: [
      "Red",
      "Blue",
      "Yellow"
    ],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
        ]
      }
    ]
};

const chartOptions = {
  title: {
    display: true,
    text: 'Working Time Pie Chart'
  }
};

class ModuleTimePieChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { widget, modules } = this.props;

    return (
      <Pie data={chartData} options={chartOptions} height="120" />
    );
  }
}

ModuleTimePieChart.propTypes = {

};

export default ModuleTimePieChart;
