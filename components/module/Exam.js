import React, { Component, PropTypes } from 'react';
import { DatePicker, Dialog, FlatButton, TextField } from 'material-ui';

class Exam extends Component {
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
    const { dispatch, exam } = this.props;
    const examDate = new Date(exam.date);

    return (
      <Dialog
        title="Edit Exam Details"
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
          hintText="Enter exam name"
          floatingLabelText="Exam Name"
          floatingLabelFixed={true}
          defaultValue={exam.name}
        />
        <br />
        <DatePicker autoOk={true} defaultDate={examDate} hintText="Select exam date" floatingLabelText="Exam Date" />
        <br />
        <TextField
          hintText="Enter exam percentage"
          floatingLabelText="Exam Percentage"
          floatingLabelFixed={true}
          defaultValue={exam.percentage}
        />
        <br />
        <TextField
          hintText="Enter exam coverage"
          floatingLabelText="Exam Coverage"
          floatingLabelFixed={true}
          defaultValue={exam.coverage}
        />
        <br />
        <TextField
          hintText="Enter exam duration"
          floatingLabelText="Exam Duration"
          floatingLabelFixed={true}
          defaultValue={exam.duration}
        />
        <br />
      </Dialog>
    );
  }
}

Exam.propTypes = {

};

export default Exam;
