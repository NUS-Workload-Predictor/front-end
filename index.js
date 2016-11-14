import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './store/store';
import App from './containers/App';

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App style={{width: '100%', height: '100%'}} />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
