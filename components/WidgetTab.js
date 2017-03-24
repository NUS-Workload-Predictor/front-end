import React, { Component, PropTypes } from 'react';
import ActionTimeline from 'material-ui/svg-icons/action/timeline';
import AvAvTimer from 'material-ui/svg-icons/av/av-timer';
import EditorFormatListNumbered from 'material-ui/svg-icons/editor/format-list-numbered';
import ActionEvent from 'material-ui/svg-icons/action/event';

import { WIDGET_TIME_TABLE, WIDGET_MODULE_TIME_TABLE, WIDGET_MODULE_TIME_LINE_CHART, WIDGET_DIFFICULTY_TABLE } from '../actions/widget.js';

const style = {
  color: 'white',
  textAlign: 'center',
  height: '35px',
  position: 'relative',
  cursor: 'pointer',
  marginTop: '5px',
  marginBottom: '5px'
};

const innerStyle = {
  color: '#9D9D9D',
  margin: 'auto auto',
  width: '30px',
  height: '30px',
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0'
};

const innerStyleDisplay = {
  color: '#EEEEEE',
  margin: 'auto auto',
  width: '30px',
  height: '30px',
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0'
};

class WidgetTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { widget } = this.props;

    switch (widget.type) {
      case WIDGET_TIME_TABLE:
        return (
          <div style={{...style}}>
            <ActionEvent style={{...innerStyle}} />
          </div>
        );

      case WIDGET_MODULE_TIME_TABLE:
        return (
          <div style={{...style}}>
            <AvAvTimer style={{...innerStyle}} />
          </div>
        );

      case WIDGET_MODULE_TIME_LINE_CHART:
        return (
          <div style={{...style}}>
            <ActionTimeline style={{...innerStyle}} />
          </div>
        );

      case WIDGET_DIFFICULTY_TABLE:
        return (
          <div style={{...style}}>
            <EditorFormatListNumbered style={{...innerStyle}} />
          </div>
        );

      default:
        return null;

    }
  }
}

WidgetTab.propTypes = {

};

export default WidgetTab;
