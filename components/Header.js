import React, { Component, PropTypes } from 'react';
import { AppBar, FlatButton, IconButton, IconMenu, MenuItem, Toggle } from 'material-ui';
import { deepOrangeA400, grey50, grey400 } from 'material-ui/styles/colors';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';

import ModuleList from './ModuleList';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {logged: false};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, logged) {
    this.setState({logged: logged});
  }

  render() {
    return (
      <div>
        <Toggle
          label="Logged"
          defaultToggled={false}
          onToggle={this.handleChange}
          labelPosition="right"
          style={{margin: 20}}
        />
        <AppBar
          title="NUS Workload Predictor"
          iconElementRight={<IconButton><NavigationExpandMore /></IconButton>}
          iconElementRight={this.state.logged
            ? <IconMenu iconButtonElement={
                <IconButton>
                  <MoreHorizIcon />
                </IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              style={{color: grey50}}>
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
              </IconMenu>
            : <FlatButton style={{color: grey50}} label="Login" />
          }
        />
      </div>
    );
  }
}

Header.propTypes = {

};

export default Header;
