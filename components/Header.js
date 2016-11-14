import React, { Component, PropTypes } from 'react';
import { AppBar, Drawer, FlatButton, IconButton, IconMenu, MenuItem, Toggle } from 'material-ui';
import { deepOrangeA400, grey50, grey400 } from 'material-ui/styles/colors';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';

import ModuleListContainer from '../containers/ModuleListContainer';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {logged: false, open: false};

    this.handleLogin = this.handleLogin.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleLogin() {
    this.setState({logged: !this.state.logged});
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <div>
        <AppBar
          title="NUSWorks"
          style={{position: 'fixed'}}
          onLeftIconButtonTouchTap={this.handleToggle}
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
                <MenuItem onTouchTap={this.handleLogin} primaryText="Sign out" />
              </IconMenu>
            : <FlatButton onTouchTap={this.handleLogin} style={{color: grey50}} label="Login" />
          }
        />
        <Drawer docked={false} width={350} open={this.state.open} onRequestChange={(open) => this.setState({open})} containerStyle={{height: '70%', top: 70}}>
          <ModuleListContainer />
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {

};

export default Header;
