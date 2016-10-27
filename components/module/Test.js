import React, { Component, PropTypes } from 'react';
import { DatePicker, Dialog, FlatButton, TextField } from 'material-ui';

class Test extends Component {
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
    const { dispatch, test } = this.props;
    const testDate = new Date(test.date);

    return (
      <Dialog
        title="Edit Test Details"
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
          hintText="Enter test name"
          floatingLabelText="Test Name"
          floatingLabelFixed={true}
          defaultValue={test.name}
        />
        <br />
        <DatePicker autoOk={true} defaultDate={testDate} hintText="Select test date" floatingLabelText="Test Date" />
        <br />
        <TextField
          hintText="Enter test percentage"
          floatingLabelText="Test Percentage"
          floatingLabelFixed={true}
          defaultValue={test.percentage}
        />
        <br />
        <TextField
          hintText="Enter test coverage"
          floatingLabelText="Test Coverage"
          floatingLabelFixed={true}
          defaultValue={test.coverage}
        />
        <br />
        <TextField
          hintText="Enter test duration"
          floatingLabelText="Test Duration"
          floatingLabelFixed={true}
          defaultValue={test.duration}
        />
        <br />
      </Dialog>
    );
  }
}

Test.propTypes = {

};

export default Test;
