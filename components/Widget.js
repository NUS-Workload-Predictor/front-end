import React, { Component, PropTypes } from 'react';
import { Line } from 'react-chartjs';
import { DragSource } from 'react-dnd';

import TimeTable from './widget/TimeTable';
import ModuleTimeTable from './widget/ModuleTimeTable';
import ModuleTimeLineChart from './widget/ModuleTimeLineChart';
import DifficultyTable from './widget/DifficultyTable';
import { WIDGET_TIME_TABLE, WIDGET_MODULE_TIME_TABLE, WIDGET_MODULE_TIME_LINE_CHART, WIDGET_DIFFICULTY_TABLE } from '../actions/widget.js';

import 'style!css!../stylesheets/style.css';

const style = {
  position: 'absolute',
  border: '1px solid gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
};

const testSpec = {
  beginDrag(props) {
    const { widget, index } = props;
    return { ...widget, index };
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

class Widget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { widget, modules, connectDragSource, isDragging } = this.props;
    const { left, top } = widget;

    switch(widget.type) {
      case WIDGET_TIME_TABLE:
        return connectDragSource(
          <div style={{...style, left, top}}>
            <TimeTable widget={widget} modules={modules} />
          </div>
        );

      case WIDGET_MODULE_TIME_TABLE:
        return connectDragSource(
          <div style={{...style, left, top}}>
            <ModuleTimeTable widget={widget} modules={modules} />
          </div>
        );

      case WIDGET_MODULE_TIME_LINE_CHART:
        return connectDragSource(
          <div style={{...style, left, top}}>
            <ModuleTimeLineChart widget={widget} modules={modules} />
          </div>
        );

      case WIDGET_DIFFICULTY_TABLE:
        return connectDragSource(
          <div style={{...style, left, top}}>
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

export default DragSource('widget', testSpec, collect)(Widget);
