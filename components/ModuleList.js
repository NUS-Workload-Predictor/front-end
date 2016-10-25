import React, { Component, PropTypes } from 'react';
import { Divider, Drawer, List, ListItem, MenuItem, RaisedButton, Subheader } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Module from './Module';
import AddModule from './AddModule';

injectTapEventPlugin();

class ModuleList extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Show Modules"
          onTouchTap={this.handleToggle}
          style={{position: 'fixed', left: '200px', bottom: '20px'}}
        />
        <Drawer docked={false} onRequestChange={(open) => this.setState({open})} open={this.state.open}>
          <List>
            <Subheader inset={true}>Modules</Subheader>
            <Module />
            <Divider inset={true} />
            <Module />
          </List>
        </Drawer>
      </div>
    );
  }
}

ModuleList.propTypes = {

};

export default ModuleList;
