import React, { Component, PropTypes } from 'react';
import { DatePicker, Dialog, FlatButton, TextField } from 'material-ui';

class Project extends Component {
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
    const { dispatch, project } = this.props;
    const releasedDate = new Date(project.released);
    const dueDate = new Date(project.due);

    return (
      <Dialog
        title="Edit Project Details"
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
          hintText="Enter project name"
          floatingLabelText="Project Name"
          floatingLabelFixed={true}
          defaultValue={project.name}
        />
        <br />
        <DatePicker autoOk={true} defaultDate={releasedDate} hintText="Select released date" floatingLabelText="Released Date" />
        <br />
        <DatePicker autoOk={true} defaultDate={dueDate} hintText="Select due date" floatingLabelText="Due Date" />
        <br />
        <TextField
          hintText="Enter project percentage"
          floatingLabelText="Project Percentage"
          floatingLabelFixed={true}
          defaultValue={project.percentage}
        />
        <br />
        <TextField
          hintText="Enter project coverage"
          floatingLabelText="Project Coverage"
          floatingLabelFixed={true}
          defaultValue={project.coverage}
        />
        <br />
        <TextField
          hintText="Enter project people"
          floatingLabelText="Project People"
          floatingLabelFixed={true}
          defaultValue={project.people}
        />
        <br />
      </Dialog>
    );
  }
}

Project.propTypes = {

};

export default Project;
