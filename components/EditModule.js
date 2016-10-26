import React, { Component, PropTypes } from 'react';
import { Dialog, FlatButton, TextField } from 'material-ui';

class EditModule extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, module: '' };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
  }

  render() {
    return (
      <div>
        <Dialog
          title="Edit Module Details"
          actions={[<FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Save"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleSubmit}
          />]}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          
        </Dialog>
      </div>
    );
  }
}

EditModule.propTypes = {

};

export default EditModule;
