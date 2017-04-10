import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Header from '../components/Header';
import Dashboard from '../components/Dashboard';

injectTapEventPlugin();

class App extends Component {
  render() {
    const { dispatch, modules, moduleList, profile } = this.props;

    return (
      <div style={{height: '100%', overflowY: 'hidden'}}>
        <Header dispatch={dispatch} moduleList={moduleList} modules={modules} profile={profile} />
        <Dashboard dispatch={dispatch} modules={modules} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  modules: state.modules,
  moduleList: state.moduleList,
  profile: state.profile
});

export default connect(mapStateToProps)(App);
