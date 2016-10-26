import React, { Component, PropTypes } from 'react';
import { Dialog, FlatButton, FloatingActionButton, TextField } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { addModule } from '../actions/module';

class AddModule extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, code: '' };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleSubmit() {
    this.props.dispatch(addModule(this.state.code));
    this.setState({open: false});
  }

  handleChange(event) {
    this.setState({code: event.target.value});
  }

  render() {
    return (
      <div>
        <FloatingActionButton onTouchTap={this.handleOpen} mini={true} style={{position: 'absolute', right: '20px', bottom: '20px'}}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add New Module"
          actions={<FlatButton
            label="OK"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleSubmit}
          />}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText="Enter module code here ..."
            floatingLabelText="Module Code"
            onChange={this.handleChange}
          />
          <br />
        </Dialog>
      </div>
    );
  }
}

AddModule.propTypes = {

};

export default AddModule;
