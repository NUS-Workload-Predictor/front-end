import React, { Component, PropTypes } from 'react';

import WidgetBoard from './WidgetBoard';
import AddWidget from './AddWidget';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <WidgetBoard />
        <AddWidget />
      </div>
    );
  }
}

Dashboard.propTypes = {

};

export default Dashboard;
