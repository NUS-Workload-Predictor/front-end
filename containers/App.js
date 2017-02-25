import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Header from '../components/Header'
import Dashboard from '../components/Dashboard';

injectTapEventPlugin();

class App extends Component {
  render() {
    const { dispatch, modules } = this.props;

    return (
      <div style={{height: '100%'}}>
        <Header dispatch={dispatch} />
        <Dashboard dispatch={dispatch} modules={modules} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  modules: state.modules
});

export default connect(mapStateToProps)(App);
