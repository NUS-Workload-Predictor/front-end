import React, { Component, PropTypes } from 'react';

import WidgetBoardContainer from '../containers/WidgetBoardContainer';
import AddWidget from './AddWidget';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <WidgetBoardContainer />
        <AddWidget />
      </div>
    );
  }
}

Dashboard.propTypes = {

};

export default Dashboard;
