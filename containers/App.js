import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header'
import Dashboard from '../components/Dashboard';

@connect(state => ({}))
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Dashboard />
      </div>
    );
  }
}

App.propTypes = {

};

export default App;
