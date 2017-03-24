import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import WidgetTab from './WidgetTab';

import '../stylesheets/WidgetTabBar.scss';

class WidgetTabBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { widgets, dispatch } = this.props;

    return (
      <div id="widget-tab-bar-container">
        {
          widgets.map((widget, i) => {
            return (
              <WidgetTab dispatch={dispatch} widget={widget} key={i} />
            );
          })
        }
      </div>
    );
  }
}

WidgetTabBar.propTypes = {

};

const mapStateToProps = (state) => ({
  widgets: state.widgets
});

export default connect(mapStateToProps)(WidgetTabBar);
