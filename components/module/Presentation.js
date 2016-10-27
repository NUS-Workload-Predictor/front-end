import React, { Component, PropTypes } from 'react';
import { DatePicker, Dialog, FlatButton, TextField } from 'material-ui';

class Presentation extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};

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

  }

  render() {
    const { dispatch, presentation } = this.props;
    const releasedDate = new Date(presentation.released);
    const dueDate = new Date(presentation.due);

    return (
      <Dialog
        title="Edit Presentation Details"
        contentStyle={{width: '40%', maxWidth: 'none'}}
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
        <br />
        <TextField
          hintText="Enter presentation name"
          floatingLabelText="Presentation Name"
          floatingLabelFixed={true}
          defaultValue={presentation.name}
        />
        <br />
        <DatePicker autoOk={true} defaultDate={releasedDate} hintText="Select released date" floatingLabelText="Released Date" />
        <br />
        <DatePicker autoOk={true} defaultDate={dueDate} hintText="Select due date" floatingLabelText="Due Date" />
        <br />
        <TextField
          hintText="Enter presentation percentage"
          floatingLabelText="Presentation Percentage"
          floatingLabelFixed={true}
          defaultValue={presentation.percentage}
        />
        <br />
        <TextField
          hintText="Enter presentation coverage"
          floatingLabelText="Presentation Coverage"
          floatingLabelFixed={true}
          defaultValue={presentation.coverage}
        />
        <br />
        <TextField
          hintText="Enter presentation people"
          floatingLabelText="Presentation People"
          floatingLabelFixed={true}
          defaultValue={presentation.people}
        />
        <br />
        <TextField
          hintText="Enter presentation duration"
          floatingLabelText="Presentation Duration"
          floatingLabelFixed={true}
          defaultValue={presentation.duration}
        />
        <br />
      </Dialog>
    );
  }
}

Presentation.propTypes = {

};

export default Presentation;
