import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, IconMenu, MenuItem } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { addWidget } from '../actions/widget';

class AddWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {openMenu: false, open: false};

    this.handleOnRequestChange = this.handleOnRequestChange.bind(this);
    this.handleAddWidget = this.handleAddWidget.bind(this);
  }

  handleOnRequestChange(value) {
    this.setState({openMenu: value});
  }

  handleAddWidget(event, child) {
    const { value } = child.props;
    const { dispatch } = this.props;

    dispatch(addWidget({
      type: value,
      top: 50,
      left: 50,
      width: '600px',
      height: '250px'
    }));
  }

  render() {
    return (
      <IconMenu
        iconButtonElement={
          <FloatingActionButton>
            <ContentAdd />
          </FloatingActionButton>}
        open={this.state.openMenu}
        onRequestChange={this.handleOnRequestChange}
        onItemTouchTap={this.handleAddWidget}
        style={{
          position: 'fixed',
          right: '30px',
          bottom: '30px'
        }}
        targetOrigin={{vertical: 'bottom', horizontal: 'right'}}
      >
        <MenuItem value={1} primaryText="Time Table" />
        <MenuItem value={2} primaryText="Module Time Table" />
        <MenuItem value={3} primaryText="Module Time Line-Chart" />
        <MenuItem value={4} primaryText="Difficulty Table" />
      </IconMenu>

    );
  }
}

AddWidget.propTypes = {

};

export default AddWidget;
