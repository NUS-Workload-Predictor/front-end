import React, { Component, PropTypes } from 'react';
import { DatePicker, Dialog, FlatButton, TextField } from 'material-ui';

import { editProject } from '../../actions/module/project';

class Project extends Component {
  constructor(props) {
    super(props);
    const { project } = this.props;

    this.state = {
      open: false,
      project: project
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
      project: {
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
    dispatch(editProject(moduleCode, index, {...this.state.project}));

    this.setState({open: false});
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
          hintText="Enter project released week"
          floatingLabelText="Project Released Week"
          floatingLabelFixed={true}
          defaultValue={project.releasedWeek}
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
          hintText="Enter project due week"
          floatingLabelText="Project Due Week"
          floatingLabelFixed={true}
          defaultValue={project.dueWeek}
          onChange={this.handleChange}
          ref="dueWeek"
        />
        <br />
        <TextField
          hintText="Enter project percentage"
          floatingLabelText="Project Percentage"
          floatingLabelFixed={true}
          defaultValue={project.percentage}
          onChange={this.handleChange}
          ref="percentage"
        />
        <br />
        <TextField
          hintText="Enter project coverage"
          floatingLabelText="Project Coverage"
          floatingLabelFixed={true}
          defaultValue={project.coverage}
          onChange={this.handleChange}
          ref="coverage"
        />
        <br />
        <TextField
          hintText="Enter project people"
          floatingLabelText="Project People"
          floatingLabelFixed={true}
          defaultValue={project.people}
          onChange={this.handleChange}
          ref="people"
        />
        <br />
      </Dialog>
    );
  }
}

Project.propTypes = {

};

export default Project;
