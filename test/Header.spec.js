import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const fetch = require('isomorphic-fetch');

import Header from '../components/Header';


const middlewares = [];
const mockStore = configureStore(middlewares);

function setup() {
  const initialState = {
    modules: [],
    widgets: [],
    moduleList: []
  };
  const store = mockStore(initialState);

  const props = {
    modules: [],
    moduleList: [],
    dispatch: () => {}
  };

  const shallowWrapper = shallow(<Header {...props} />);

  const mountWrapper = mount(<Header {...props} />, {
    context: {
      muiTheme: getMuiTheme(),
      store: store
    },
    childContextTypes: {
      muiTheme: React.PropTypes.object.isRequired,
      store: React.PropTypes.object.isRequired
    }
  });

  return {
    props,
    shallowWrapper,
    mountWrapper
  }
}

describe('<Header />', function () {
  it('should have a div', function () {
    const { shallowWrapper } = setup();
    expect(shallowWrapper.find('div')).to.have.length(1);
  });

  it('should have a AppBar', function () {
    const { mountWrapper } = setup();
    expect(mountWrapper.find('AppBar')).to.have.length(1);
  });

  it('should have a Drawer', function () {
    const { mountWrapper } = setup();
    expect(mountWrapper.find('Drawer')).to.have.length(1);
  });

  it('should have two Dialogs', function () {
    const { mountWrapper } = setup();
    expect(mountWrapper.find('Dialog')).to.have.length(3);
  });
});
