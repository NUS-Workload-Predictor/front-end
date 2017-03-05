import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Header from '../components/Header'
import Dashboard from '../components/Dashboard';

injectTapEventPlugin();

class App extends Component {
  render() {
    const { dispatch, modules, moduleList } = this.props;

    return (
      <div style={{height: '100%'}}>
        <Header dispatch={dispatch} moduleList={moduleList} modules={modules} />
        <Dashboard dispatch={dispatch} modules={modules} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  modules: state.modules,
  moduleList: state.moduleList
});

export default connect(mapStateToProps)(App);
