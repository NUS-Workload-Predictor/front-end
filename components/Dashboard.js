import React, { Component, PropTypes } from 'react';

import WidgetBoardContainer from '../containers/WidgetBoardContainer';
import WidgetTabBar from './WidgetTabBar';
import AddWidget from './AddWidget';

import '../stylesheets/Dashboard.scss'

class Dashboard extends Component {
  render() {
    const { dispatch, modules } = this.props;

    return (
      <div id="dashboard-container">
        <WidgetTabBar />
        <WidgetBoardContainer />
        {/* <AddWidget dispatch={dispatch} modules={modules} /> */}
      </div>
    );
  }
}

Dashboard.propTypes = {

};

export default Dashboard;
