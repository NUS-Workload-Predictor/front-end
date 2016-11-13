import React, { Component, PropTypes } from 'react';
import { DatePicker, Dialog, FlatButton, TextField } from 'material-ui';

import { editTest } from '../../actions/module/test';

class Test extends Component {
  constructor(props) {
    super(props);
    const { test } = this.props;

    this.state = {
      open: false,
      test: test
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  formatDate(date) {
    if (date) {
      let year = date.getFullYear();
      let month = date.getMonth() < 9 ? '0' + date.getMonth() : date.getMonth() + 1;
      let day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();

      return year + '-' + month + '-' + day;
    }

    return '';
  }

  handleChange() {
    this.setState({
      test: {
        name: this.refs.name.getValue(),
        date: this.formatDate(this.refs.date.state.date),
        percentage: this.refs.percentage.getValue(),
        coverage: this.refs.coverage.getValue(),
        duration: this.refs.duration.getValue()
      }
    });
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleSubmit() {
    const { moduleCode, dispatch, index } = this.props;
    dispatch(editTest(moduleCode, index, {...this.state.test}));

    this.setState({open: false});
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
          onChange={this.handleChange}
          ref="name"
        />
        <br />
        <DatePicker
          autoOk={true}
          defaultDate={testDate}
          hintText="Select test date"
          floatingLabelText="Test Date"
          onChange={this.handleChange}
          ref="date"
        />
        <br />
        <TextField
          hintText="Enter test percentage"
          floatingLabelText="Test Percentage"
          floatingLabelFixed={true}
          defaultValue={test.percentage}
          onChange={this.handleChange}
          ref="percentage"
        />
        <br />
        <TextField
          hintText="Enter test coverage"
          floatingLabelText="Test Coverage"
          floatingLabelFixed={true}
          defaultValue={test.coverage}
          onChange={this.handleChange}
          ref="coverage"
        />
        <br />
        <TextField
          hintText="Enter test duration"
          floatingLabelText="Test Duration"
          floatingLabelFixed={true}
          defaultValue={test.duration}
          onChange={this.handleChange}
          ref="duration"
        />
        <br />
      </Dialog>
    );
  }
}

Test.propTypes = {

};

export default Test;
