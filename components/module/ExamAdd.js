import React, { Component, PropTypes } from 'react';
import { DatePicker, Dialog, FlatButton, TextField } from 'material-ui';

import { addExam } from '../../actions/module/exam';

class ExamAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      exam: {
        name: '',
        date: '',
        percentage: '',
        coverage: '',
        duration: ''
      }
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
      exam: {
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
    const { moduleCode, dispatch } = this.props;
    dispatch(addExam(moduleCode, {...this.state.exam}));

    this.setState({open: false});
  }

  render() {
    const { dispatch, moduleCode } = this.props;

    return (
      <Dialog
        title="Add New Exam"
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
          onChange={this.handleChange}
          ref="name"
        />
        <br />
        <DatePicker
          autoOk={true}
          hintText="Select exam date"
          floatingLabelText="Exam Date"
          onChange={this.handleChange}
          ref="date"
        />
        <br />
        <TextField
          hintText="Enter exam percentage"
          floatingLabelText="Exam Percentage"
          floatingLabelFixed={true}
          onChange={this.handleChange}
          ref="percentage"
        />
        <br />
        <TextField
          hintText="Enter exam coverage"
          floatingLabelText="Exam Coverage"
          floatingLabelFixed={true}
          onChange={this.handleChange}
          ref="coverage"
        />
        <br />
        <TextField
          hintText="Enter exam duration"
          floatingLabelText="Exam Duration"
          floatingLabelFixed={true}
          onChange={this.handleChange}
          ref="duration"
        />
        <br />
      </Dialog>
    );
  }
}

ExamAdd.propTypes = {

};

export default ExamAdd;
