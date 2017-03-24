import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import WidgetTab from './WidgetTab';

const style = {
  display: 'table-cell',
  backgroundColor: 'black',
  color: 'white',
  height: '100%',
  width: '60px',
  minWidth: '60px',
  verticalAlign: 'top',
  paddingTop: '15px'
};

class WidgetTabBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { widgets } = this.props;

    return (
      <div style={style}>
        {
          widgets.map((widget, i) => {
            return (
              <WidgetTab widget={widget} key={i} />
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
