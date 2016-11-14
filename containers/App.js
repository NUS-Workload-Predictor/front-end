import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Header from '../components/Header'
import Dashboard from '../components/Dashboard';

injectTapEventPlugin();

class App extends Component {
  render() {
    const { dispatch } = this.props;

    return (
      <div style={{height: '100%'}}>
        <Header />
        <Dashboard dispatch={dispatch} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  widgets: state.widgets
});

export default connect(mapStateToProps)(App);
