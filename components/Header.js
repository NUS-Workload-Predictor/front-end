import React, { Component, PropTypes } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <span>Welcome!</span>
        <button>Login</button>
      </div>
    );
  }
}

Header.propTypes = {

};

export default Header;
