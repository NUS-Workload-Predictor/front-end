import React, { Component, PropTypes } from 'react';
import Module from './Module';
import AddModule from './AddModule';

class ModuleList extends Component {
  render() {
    return (
      <div>
        <AddModule />
      </div>
    );
  }
}

ModuleList.propTypes = {

};

export default ModuleList;
