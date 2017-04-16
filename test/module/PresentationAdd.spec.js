import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';

const fetch = require('isomorphic-fetch');

import App from '../containers/App';


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
    dispatch: () => {},
    style: {},
    store: store
  };

  const wrapper = shallow(<App { ...props } />);

  return {
    props,
    wrapper
  };
}

describe('<App />', function () {
  it('should have a App', function () {
    const { wrapper } = setup();
    expect(wrapper.find('App')).to.have.length(1);
  });
});
