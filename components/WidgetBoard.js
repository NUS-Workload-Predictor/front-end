import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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
