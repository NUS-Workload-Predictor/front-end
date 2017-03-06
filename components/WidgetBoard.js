import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import { connect } from 'react-redux';

import Widget from './Widget';
import { moveWidget } from '../actions/widget';

const styles = {
  width: '100%',
  height: '100%',
  paddingTop: '5%'
};

class WidgetBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { connectDropTarget, widgets, modules, dispatch } = this.props;

    return (
      <div style={styles}>
        {widgets.map((widget, i) => {
          return (
            <Widget
              key={i}
              index={i}
              widget={widget}
              module={widget.module}
              modules={modules}
              dispatch={dispatch}
          />);
        })}
      </div>
    );
  }
}

WidgetBoard.propTypes = {

};

export default WidgetBoard;
