import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Header from '../components/Header'
import Dashboard from '../components/Dashboard';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div style={{height: '100%'}}>
        <Header />
        <Dashboard />
      </div>
    );
  }
}

export default App;
