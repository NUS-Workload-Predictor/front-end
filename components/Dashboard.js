import React, { Component, PropTypes } from 'react';

import WidgetBoardContainer from '../containers/WidgetBoardContainer';
import AddWidget from './AddWidget';

class Dashboard extends Component {
  render() {
    const { dispatch, modules } = this.props;

    return (
      <div style={{height: '100%'}}>
        <WidgetBoardContainer />
        <AddWidget dispatch={dispatch} modules={modules} />
      </div>
    );
  }
}

Dashboard.propTypes = {

};

export default Dashboard;
