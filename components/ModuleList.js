import React, { Component, PropTypes } from 'react';
import { Divider, List, Subheader } from 'material-ui';

import Module from './Module';
import AddModule from './AddModule';

class ModuleList extends Component {
  render() {
    return (
      <List>
        <Subheader inset={true}>Modules</Subheader>
        <Module />
        <Divider inset={true} />
        <Module />
      </List>
    );
  }
}

ModuleList.propTypes = {

};

export default ModuleList;
