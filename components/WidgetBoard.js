import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import { connect } from 'react-redux';

import Widget from './Widget';
import { moveWidget } from '../actions/widget';

import '../stylesheets/WidgetBoard.scss';

class WidgetBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { widgets, modules, dispatch, timeTable } = this.props;

    return (
      <div id="widget-board-container">
        {widgets.filter(widget => widget.display).map((widget, i) => {
          return (
            <Widget
              key={i}
              index={i}
              widget={widget}
              module={widget.module}
              modules={modules}
              dispatch={dispatch}
              timeTable={timeTable}
          />);
        })}
      </div>
    );
  }
}

WidgetBoard.propTypes = {

};

export default WidgetBoard;
