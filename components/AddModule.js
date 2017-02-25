import React, { Component, PropTypes } from 'react';
import { Dialog, FlatButton, FloatingActionButton, TextField } from 'material-ui';
import FileCreateNewFolder from 'material-ui/svg-icons/file/create-new-folder';

import { addModule } from '../actions/module';
import { NUSMODS_API_BASE_URL, ACADEMIC_YEAR, SEMESTER } from '../constants/constants';

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
    const { dispatch } = this.props;
    let self = this;

    fetch(NUSMODS_API_BASE_URL + ACADEMIC_YEAR + '/' + SEMESTER + '/modules/' + this.state.code + ".json")
    .then(function(response) {
      response.json().then(function(json) {
        dispatch(addModule(json));
        self.setState({open: false});
      });
    });
  }

  handleChange(event) {
    this.setState({code: event.target.value});
  }

  render() {
    return (
      <div>
        <FloatingActionButton onTouchTap={this.handleOpen} mini={true} style={{position: 'absolute', right: '20px', bottom: '20px'}}>
          <FileCreateNewFolder />
        </FloatingActionButton>
        <Dialog
          title="Add New Module"
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
