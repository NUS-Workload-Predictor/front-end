import React, { Component, PropTypes } from 'react';
import { DatePicker, Dialog, FlatButton, TextField } from 'material-ui';

import { addProject } from '../../actions/module/project';

class ProjectAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      project: {
        name: '',
        released: '',
        releasedWeek: '',
        due: '',
        dueWeek: '',
        percentage: '',
        coverage: '',
        people: ''
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
    const { moduleCode, dispatch } = this.props;
    dispatch(addProject(moduleCode, {...this.state.project}));

    this.setState({open: false});
  }

  render() {
    const { dispatch, moduleCode } = this.props;

    return (
      <Dialog
        title="Add New Project"
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
          onChange={this.handleChange}
          ref="name"
        />
        <br />
        <DatePicker
          autoOk={true}
          hintText="Select project released date"
          floatingLabelText="Project Released Date"
          onChange={this.handleChange}
          ref="released"
        />
        <br />
        <TextField
          hintText="Enter project released week"
          floatingLabelText="Project Released Week"
          floatingLabelFixed={true}
          onChange={this.handleChange}
          ref="releasedWeek"
        />
        <br />
        <DatePicker
          autoOk={true}
          hintText="Select project due date"
          floatingLabelText="Project Due Date"
          onChange={this.handleChange}
          ref="due"
        />
        <br />
        <TextField
          hintText="Enter project due week"
          floatingLabelText="Project Due Week"
          floatingLabelFixed={true}
          onChange={this.handleChange}
          ref="dueWeek"
        />
        <br />
        <TextField
          hintText="Enter project percentage"
          floatingLabelText="Project Percentage"
          floatingLabelFixed={true}
          onChange={this.handleChange}
          ref="percentage"
        />
        <br />
        <TextField
          hintText="Enter project coverage"
          floatingLabelText="Project Coverage"
          floatingLabelFixed={true}
          onChange={this.handleChange}
          ref="coverage"
        />
        <br />
        <TextField
          hintText="Enter project people"
          floatingLabelText="Project People"
          floatingLabelFixed={true}
          onChange={this.handleChange}
          ref="people"
        />
        <br />
      </Dialog>
    );
  }
}

ProjectAdd.propTypes = {

};

export default ProjectAdd;
