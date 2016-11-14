import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import WidgetBoard from '../components/WidgetBoard';

class WidgetBoardContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { widgets, modules, dispatch } = this.props;

    return (
      <WidgetBoard widgets={widgets} modules={modules} dispatch={dispatch}  />
    );
  }
}

WidgetBoardContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  widgets: state.widgets,
  modules: state.modules
});

export default connect(mapStateToProps)(WidgetBoardContainer);
