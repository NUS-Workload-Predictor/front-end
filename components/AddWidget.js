import React, { Component, PropTypes } from 'react';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

class AddWidget extends Component {
  render() {
    return (
      <FloatingActionButton style={{
        position: 'fixed',
        right: '20px',
        bottom: '20px'
      }}>
        <ContentAdd />
      </FloatingActionButton>
    );
  }
}

AddWidget.propTypes = {

};

export default AddWidget;
