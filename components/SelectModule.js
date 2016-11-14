import React, { Component, PropTypes } from 'react';
import { Checkbox, Dialog, FlatButton, FloatingActionButton, TextField } from 'material-ui';
import FileCreateNewFolder from 'material-ui/svg-icons/file/create-new-folder';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

import { addWidget } from '../actions/widget';
import { WIDGET_MODULE_TIME_LINE_CHART } from '../actions/widget';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

class SelectModule extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleSubmit() {
    const { modules, dispatch } = this.props;

    for (let i = 0; i < modules.length; i++) {
      console.log(this.refs['checkbox' + i]);
      if (this.refs['checkbox' + i].state.switched) {
        dispatch(addWidget({
          type: WIDGET_MODULE_TIME_LINE_CHART,
          top: 50,
          left: 50,
          width: '600px',
          height: '250px',
          moduleCode: this.refs['checkbox' + i].props.label
        }));
      }
    }

    this.setState({open: false});
  }

  render() {
    const { modules } = this.props;

    return (
      <div>
        <Dialog
          title="Select Module"
          actions={[<FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="OK"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleSubmit}
          />]}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div style={styles.block}>
            {modules.map((module, i) =>
              <Checkbox key={i} ref={'checkbox' + i} label={module.code} style={styles.checkbox} />
            )}
          </div>
          <br />
        </Dialog>
      </div>
    );
  }
}

SelectModule.propTypes = {

};

export default SelectModule;
