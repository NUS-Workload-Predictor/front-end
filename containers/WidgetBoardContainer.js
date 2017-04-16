import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import WidgetBoard from '../components/WidgetBoard';

class WidgetBoardContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { widgets, modules, dispatch, timeTable } = this.props;

    return (
      <WidgetBoard widgets={widgets} modules={modules} dispatch={dispatch} timeTable={timeTable} />
    );
  }
}

WidgetBoardContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  widgets: state.widgets,
  modules: state.modules,
  timeTable: state.timeTable
});

export default connect(mapStateToProps)(WidgetBoardContainer);
