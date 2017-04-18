import React, { Component, PropTypes } from 'react';
import { DatePicker, Dialog, FlatButton, Snackbar, TextField } from 'material-ui';

import { editExam } from '../../actions/module/exam';

class Exam extends Component {
  constructor(props) {
    super(props);
    const { exam } = this.props;

    this.state = {
      open: false,
      openSnackbar: false,
      exam: exam
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
    const { moduleCode, dispatch, index } = this.props;
    let allFilled = true;
    let exam = this.state.exam;
    Object.keys(exam).forEach(function(key,index) {
      if (!exam[key]) {
        allFilled = false;
      }
    });

    if (allFilled) {
      dispatch(editExam(moduleCode, index, {...this.state.exam}));

      this.setState({open: false});
    } else {
      this.setState({openSnackbar: true});
    }
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
        <Snackbar
          open={this.state.openSnackbar}
          message="Must fill in all fields"
          autoHideDuration={3000}
          onRequestClose={() => {
              this.setState({
                openSnackbar: false,
              });
            }
          }
        />
        <br />
        <TextField
          hintText="Enter exam name"
          floatingLabelText="Exam Name"
          floatingLabelFixed={true}
          defaultValue={exam.name}
          onChange={this.handleChange}
          ref="name"
        />
        <br />
        <DatePicker
          autoOk={true}
          defaultDate={examDate}
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
          defaultValue={exam.percentage}
          onChange={this.handleChange}
          ref="percentage"
        />
        <br />
        <TextField
          hintText="Enter exam coverage"
          floatingLabelText="Exam Coverage"
          floatingLabelFixed={true}
          defaultValue={exam.coverage}
          onChange={this.handleChange}
          ref="coverage"
        />
        <br />
        <TextField
          hintText="Enter exam duration"
          floatingLabelText="Exam Duration"
          floatingLabelFixed={true}
          defaultValue={exam.duration}
          onChange={this.handleChange}
          ref="duration"
        />
        <br />
      </Dialog>
    );
  }
}

Exam.propTypes = {

};

export default Exam;
