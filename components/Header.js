import React, { Component, PropTypes } from 'react';
import { AppBar, Drawer, FlatButton, IconButton, IconMenu, MenuItem, Toggle } from 'material-ui';
import { deepOrangeA400, grey50, grey400 } from 'material-ui/styles/colors';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';

import ModuleListContainer from '../containers/ModuleListContainer';

import { IVLE_API_KEY, REDIRECT_URL, IVLE_API_BASE_URL } from '../constants/constants';

const ivleLogin = 'https://ivle.nus.edu.sg/api/login/?apikey=' + IVLE_API_KEY + '&url=' + REDIRECT_URL;
const defaultExpire = 30;
const tokenName = 'token';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {logged: false, open: false};

    let token = this.getCookie(tokenName);
    if (token) {
      this.state = { ...this.state, logged: true };
    } else {
      token = this.getTokenFromUrl();
      if (token) {
        this.state = { ...this.state, logged: true };
        this.saveTokenToCookie(token);
      }
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  getTokenFromUrl() {
    let url = window.location.href;
    let name = tokenName;

    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    let results = regex.exec(url);

    if (!results) {
      return null;
    }

    if (!results[2]) {
      return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  saveTokenToCookie(token) {
    const name = tokenName;

    this.removeCookie(name);
    this.setCookie(name, token, defaultExpire);
  }

  setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  getCookie(name) {
    let nameEqual = name + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEqual) == 0) {
          return c.substring(nameEqual.length, c.length);
        }
    }
    return null;
  }

  removeCookie(name) {
    this.setCookie(name, "", -1);
  }

  handleLogin() {
    window.location.href = ivleLogin;
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
