import React, { Component, PropTypes } from 'react';
import { Pie } from 'react-chartjs';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

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

    this.state = { display: this.props.modules.length + 1 };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({ display: value });
  }

  render() {
    const { widget, modules } = this.props;

    return (
      <div>
        <SelectField
          floatingLabelText="Frequency"
          value={this.state.display}
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
