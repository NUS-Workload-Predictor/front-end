import React, { Component, PropTypes } from 'react';
import { Divider, FloatingActionButton, List, ListItem, RaisedButton, Subheader } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Module from './Module';
import AddModule from './AddModule';

class ModuleList extends Component {
  render() {
    return (
      <div>
        <List>
          <Subheader>{'Module List'}</Subheader>
          <Module />
          <Divider />
        </List>
        <div>
          <FloatingActionButton mini={true} style={{position: 'absolute', right: '20px', bottom: '20px'}}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </div>
    );
  }
}

ModuleList.propTypes = {

};

export default ModuleList;
