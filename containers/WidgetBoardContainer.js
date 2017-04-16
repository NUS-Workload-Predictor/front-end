import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import WidgetBoard from '../components/WidgetBoard';

class WidgetBoardContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { widgets, modules, dispatch, timeTable, profile } = this.props;

    return (
      <WidgetBoard widgets={widgets} modules={modules} dispatch={dispatch} timeTable={timeTable} profile={profile} />
    );
  }
}

WidgetBoardContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  widgets: state.widgets,
  modules: state.modules,
  timeTable: state.timeTable,
  profile: state.profile
});

export default connect(mapStateToProps)(WidgetBoardContainer);
