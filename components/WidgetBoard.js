import React, { Component, PropTypes } from 'react';
import Widget from './Widget';

class WidgetBoard extends Component {
  render() {
    return (
      <div style={{paddingTop: '80px', paddingLeft: '20px'}}>
        <Widget />
      </div>
    );
  }
}

WidgetBoard.propTypes = {

};

export default WidgetBoard;
