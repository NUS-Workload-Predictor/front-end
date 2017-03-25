import React, { Component, PropTypes } from 'react';
import { Line } from 'react-chartjs';
import { FloatingActionButton } from 'material-ui';
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';

import TimeTable from './widget/TimeTable';
import ModuleTimeTable from './widget/ModuleTimeTable';
import ModuleTimeLineChart from './widget/ModuleTimeLineChart';
import ModuleTimePieChart from './widget/ModuleTimePieChart';
import DifficultyTable from './widget/DifficultyTable';
import { deleteWidget, WIDGET_TIME_TABLE, WIDGET_MODULE_TIME_TABLE, WIDGET_MODULE_TIME_LINE_CHART, WIDGET_MODULE_TIME_PIE_CHART, WIDGET_DIFFICULTY_TABLE } from '../actions/widget.js';

import '../stylesheets/Widget.scss';

class Widget extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    const { dispatch, index } = this.props;

    dispatch(deleteWidget(index));
  }

  render() {
    const { widget, modules, connectDragSource, isDragging } = this.props;
    // const { left, top } = widget;

    switch(widget.type) {
      case WIDGET_TIME_TABLE:
        // const module = modules.reduce((x, y) => x.moduleCode === widget.moduleCode ? x : y);

        return (
          <div className="widget-container">
            <TimeTable widget={widget} modules={modules} />
          </div>
        );

      case WIDGET_MODULE_TIME_TABLE:
        return (
          <div className="widget-container">
            <ModuleTimeTable widget={widget} modules={modules} />
          </div>
        );

      case WIDGET_MODULE_TIME_LINE_CHART:
        return (
          <div className="widget-container">
            <ModuleTimeLineChart widget={widget} modules={modules} />
          </div>
        );

      case WIDGET_MODULE_TIME_PIE_CHART:
        return (
          <div className="widget-container">
            <ModuleTimePieChart widget={widget} modules={modules} />
          </div>
        );

      case WIDGET_DIFFICULTY_TABLE:
        return (
          <div className="widget-container">
            <DifficultyTable widget={widget} modules={modules} />
          </div>
        );

      default:
        return null;
    }

    return
  }
}

Widget.propTypes = {

};

export default Widget;
