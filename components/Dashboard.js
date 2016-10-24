import React, { Component, PropTypes } from 'react';
import AddWidget from '../components/AddWidget';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <ModuleList />
        <WidgetBoard />
        <AddWidget />
      </div>
    );
  }
}

Dashboard.propTypes = {

};

export default Dashboard;
