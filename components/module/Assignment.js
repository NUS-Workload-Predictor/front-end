import React, { Component, PropTypes } from 'react';
import { DatePicker, Dialog, FlatButton, TextField } from 'material-ui';

class Assignment extends Component {
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
    const { dispatch, assignment } = this.props;
    const releasedDate = new Date(assignment.released);
    const dueDate = new Date(assignment.due);

    return (
      <Dialog
        title="Edit Assignment Details"
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
          hintText="Enter assignment name"
          floatingLabelText="Assignment Name"
          floatingLabelFixed={true}
          defaultValue={assignment.name}
        />
        <br />
        <DatePicker autoOk={true} defaultDate={releasedDate} hintText="Select released date" floatingLabelText="Released Date" />
        <br />
        <DatePicker autoOk={true} defaultDate={dueDate} hintText="Select due date" floatingLabelText="Due Date" />
        <br />
        <TextField
          hintText="Enter assignment percentage"
          floatingLabelText="Assignment Percentage"
          floatingLabelFixed={true}
          defaultValue={assignment.percentage}
        />
        <br />
        <TextField
          hintText="Enter assignment coverage"
          floatingLabelText="Assignment Coverage"
          floatingLabelFixed={true}
          defaultValue={assignment.coverage}
        />
        <br />
        <TextField
          hintText="Enter assignment people"
          floatingLabelText="Assignment People"
          floatingLabelFixed={true}
          defaultValue={assignment.people}
        />
        <br />
      </Dialog>
    );
  }
}

Assignment.propTypes = {

};

export default Assignment;
