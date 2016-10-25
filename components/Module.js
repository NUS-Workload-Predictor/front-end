import React, { Component, PropTypes } from 'react';
import { Avatar, FontIcon, IconButton, IconMenu, ListItem, MenuItem } from 'material-ui';
import { blue500, grey400 } from 'material-ui/styles/colors';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class Module extends Component {
  render() {
    return (
      <ListItem
        leftIcon={<NavigationClose />}
        rightIcon={<ImageEdit />}
        primaryText="CS1010"
      />
    );
  }
}

Module.propTypes = {

};

export default Module;
