import React, { Component, PropTypes } from 'react';
import { Avatar, Divider, FontIcon, IconButton, IconMenu, ListItem, MenuItem } from 'material-ui';
import { blue500, grey400 } from 'material-ui/styles/colors';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FileFolder from 'material-ui/svg-icons/file/folder';

import { deleteModule } from '../actions/module';
import EditModule from './EditModule';

class Module extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    this.refs.editModule.setState({open: true});
  }

  handleDelete() {
    const { dispatch, index } = this.props;

    dispatch(deleteModule(index));
  }

  render() {
    const { dispatch, module } = this.props;

    return (
      <div>
        <ListItem
          leftIcon={<FileFolder />}
          rightIconButton={<IconButton onTouchTap={this.handleDelete}><NavigationClose /></IconButton>}
          onTouchTap={this.handleEdit}
          primaryText={module.code}
          secondaryText={
            <p>
              {module.title}
            </p>
          }
        />
        <EditModule ref="editModule" module={module} dispatch={dispatch} />
        <Divider />
      </div>
    );
  }
}

Module.propTypes = {

};

export default Module;
