import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import WidgetBoard from '../components/WidgetBoard';

class WidgetBoardContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { widgets, dispatch } = this.props;

    return (
      <WidgetBoard widgets={widgets} dispatch={dispatch}  />
    );
  }
}

WidgetBoardContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  widgets: state.widgets
});

export default connect(mapStateToProps)(WidgetBoardContainer);
