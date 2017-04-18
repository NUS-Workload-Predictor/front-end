import React, { Component, PropTypes } from 'react';
import { DatePicker, Dialog, FlatButton, Snackbar, TextField } from 'material-ui';

import { editAssignment } from '../../actions/module/assignment';

class Assignment extends Component {
  constructor(props) {
    super(props);
    const { assignment } = this.props;

    this.state = {
      open: false,
      openSnackbar: false,
      assignment: assignment
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
      assignment: {
        name: this.refs.name.getValue(),
        released: this.formatDate(this.refs.released.state.date),
        releasedWeek: this.refs.releasedWeek.getValue(),
        due: this.formatDate(this.refs.due.state.date),
        dueWeek: this.refs.dueWeek.getValue(),
        percentage: this.refs.percentage.getValue(),
        coverage: this.refs.coverage.getValue(),
        people: this.refs.people.getValue()
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
    let assignment = this.state.assignment;
    Object.keys(assignment).forEach(function(key,index) {
      if (!assignment[key]) {
        allFilled = false;
      }
    });

    if (allFilled) {
      dispatch(editAssignment(moduleCode, index, {...this.state.assignment}));

      this.setState({open: false});
    } else {
      this.setState({openSnackbar: true});
    }
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
          hintText="Enter assignment name"
          floatingLabelText="Assignment Name"
          floatingLabelFixed={true}
          defaultValue={assignment.name}
          onChange={this.handleChange}
          ref="name"
        />
        <br />
        <DatePicker
          autoOk={true}
          defaultDate={releasedDate}
          hintText="Select released date"
          floatingLabelText="Released Date"
          onChange={this.handleChange}
          ref="released"
        />
        <br />
        <TextField
          hintText="Enter assignment released week"
          floatingLabelText="Assignment Released Week"
          floatingLabelFixed={true}
          defaultValue={assignment.releasedWeek}
          onChange={this.handleChange}
          ref="releasedWeek"
        />
        <br />
        <DatePicker
          autoOk={true}
          defaultDate={dueDate}
          hintText="Select due date"
          floatingLabelText="Due Date"
          onChange={this.handleChange}
          ref="due"
        />
        <br />
        <TextField
          hintText="Enter assignment due week"
          floatingLabelText="Assignment Due Week"
          floatingLabelFixed={true}
          defaultValue={assignment.dueWeek}
          onChange={this.handleChange}
          ref="dueWeek"
        />
        <br />
        <TextField
          hintText="Enter assignment percentage"
          floatingLabelText="Assignment Percentage"
          floatingLabelFixed={true}
          defaultValue={assignment.percentage}
          onChange={this.handleChange}
          ref="percentage"
        />
        <br />
        <TextField
          hintText="Enter assignment coverage"
          floatingLabelText="Assignment Coverage"
          floatingLabelFixed={true}
          defaultValue={assignment.coverage}
          onChange={this.handleChange}
          ref="coverage"
        />
        <br />
        <TextField
          hintText="Enter assignment people"
          floatingLabelText="Assignment People"
          floatingLabelFixed={true}
          defaultValue={assignment.people}
          onChange={this.handleChange}
          ref="people"
        />
        <br />
      </Dialog>
    );
  }
}

Assignment.propTypes = {

};

export default Assignment;
