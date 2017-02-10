import React, { Component, PropTypes } from 'react';
import { Line } from 'react-chartjs';
import { DragSource } from 'react-dnd';
import { FloatingActionButton } from 'material-ui';
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';

import TimeTable from './widget/TimeTable';
import ModuleTimeTable from './widget/ModuleTimeTable';
import ModuleTimeLineChart from './widget/ModuleTimeLineChart';
import DifficultyTable from './widget/DifficultyTable';
import { deleteWidget, WIDGET_TIME_TABLE, WIDGET_MODULE_TIME_TABLE, WIDGET_MODULE_TIME_LINE_CHART, WIDGET_DIFFICULTY_TABLE } from '../actions/widget.js';

import 'style!css!../stylesheets/style.css';

const style = {
  position: 'absolute',
  boxShadow: "2px 2px 10px #888888",
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'pointer'
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

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    const { dispatch, index } = this.props;
    
    dispatch(deleteWidget(index));
  }

  render() {
    const { widget, modules, connectDragSource, isDragging } = this.props;
    const { left, top } = widget;

    switch(widget.type) {
      case WIDGET_TIME_TABLE:
        const module = modules.reduce((x, y) => x.moduleCode === widget.moduleCode ? x : y);

        return connectDragSource(
          <div style={{...style, left, top}}>
            <TimeTable widget={widget} module={module} />
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
            <FloatingActionButton mini={true} secondary={true} onTouchTap={this.handleClose} style={{position: 'absolute', right: 10, top: 10}}>
              <ActionHighlightOff />
            </FloatingActionButton>
            <ModuleTimeLineChart widget={widget} modules={modules} />
          </div>
        );

      case WIDGET_DIFFICULTY_TABLE:
        return connectDragSource(
          <div style={{...style, left, top}}>
            <FloatingActionButton mini={true} secondary={true} onTouchTap={this.handleClose} style={{position: 'absolute', right: 10, top: 10, zIndex: 1}}>
              <ActionHighlightOff />
            </FloatingActionButton>
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
