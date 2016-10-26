import React, { Component, PropTypes } from 'react';
import { Avatar, Divider, FontIcon, IconButton, IconMenu, ListItem, MenuItem } from 'material-ui';
import { blue500, grey400 } from 'material-ui/styles/colors';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class Module extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { module } = this.props;

    return (
      <div>
        <ListItem
          leftIcon={<NavigationClose />}
          rightIcon={<ImageEdit />}
          primaryText={module.code}
        />
      </div>
    );
  }
}

Module.propTypes = {

};

export default Module;
