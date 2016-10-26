import React, { Component, PropTypes } from 'react';
import { Avatar, Divider, FontIcon, IconButton, IconMenu, ListItem, MenuItem } from 'material-ui';
import { blue500, grey400 } from 'material-ui/styles/colors';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FileFolder from 'material-ui/svg-icons/file/folder';

import { deleteModule } from '../actions/module';

class Module extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { dispatch, index } = this.props;

    dispatch(deleteModule(index));
  }

  render() {
    const { module } = this.props;

    return (
      <div>
        <ListItem
          leftIcon={<FileFolder />}
          rightIconButton={<IconButton onTouchTap={this.handleDelete}><NavigationClose /></IconButton>}
          primaryText={module.code}
          secondaryText={
            <p>
              Test
            </p>
          }
        />
        <Divider />
      </div>
    );
  }
}

Module.propTypes = {

};

export default Module;
