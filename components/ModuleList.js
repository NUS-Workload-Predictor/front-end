import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, List, RaisedButton, Subheader } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Module from './Module';
import AddModule from './AddModule';

class ModuleList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modules, dispatch } = this.props;

    return (
      <div>
        <List>
          <Subheader>{'Module List'}</Subheader>
          {modules.map((module, i) =>
            <Module key={i} module={module}/>
          )}
        </List>
        <AddModule dispatch={dispatch}/>
      </div>
    );
  }
}

ModuleList.propTypes = {

};

export default ModuleList;
