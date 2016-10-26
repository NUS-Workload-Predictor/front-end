import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ModuleList from '../components/ModuleList';

class ModuleListContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modules, dispatch } = this.props;

    return (
      <ModuleList modules={modules} dispatch={dispatch} />
    );
  }
}

ModuleListContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  modules: state.modules
});

export default connect(mapStateToProps)(ModuleListContainer);
