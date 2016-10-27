import React, { Component, PropTypes } from 'react';
import { Dialog, FlatButton, FontIcon, Tab, Tabs, TextField } from 'material-ui';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionBook from 'material-ui/svg-icons/action/book';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import ActionSpellcheck from 'material-ui/svg-icons/action/spellcheck';
import AvMic from 'material-ui/svg-icons/av/mic';
import AvPlaylistAddCheck from 'material-ui/svg-icons/av/playlist-add-check';

import AssignmentList from './module/AssignmentList';
import ExamList from './module/ExamList';
import PresentationList from './module/PresentationList';
import ProjectList from './module/ProjectList';
import ReadingList from './module/ReadingList';
import TestList from './module/TestList';

class EditModule extends Component {
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
    const { dispatch } = this.props;
  }

  render() {
    const { dispatch, assignments, projects, presentations, readings, tests, exams } = this.props.module;

    return (
      <div>
        <Dialog
          title="Edit Module Details"
          contentStyle={{width: '80%', maxWidth: 'none'}}
          actions={[<FlatButton
            label="Add New"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleSubmit}
          />,
          <FlatButton
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
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab label="Assignment" icon={<ActionAssignment />} value="assignment" >
              <AssignmentList assignments={assignments} dispatch={dispatch} />
            </Tab>
            <Tab label="Project" icon={<ActionDashboard />} value="project" >
              <ProjectList projects={projects} dispatch={dispatch} />
            </Tab>
            <Tab label="Presentation" icon={<AvMic />} value="presentation" >
              <PresentationList presentations={presentations} dispatch={dispatch} />
            </Tab>
            <Tab label="Reading" icon={<ActionBook />} value="reading" >
              <ReadingList readings={readings} dispatch={dispatch} />
            </Tab>
            <Tab label="Test" icon={<ActionSpellcheck />} value="test" >
              <TestList tests={tests} dispatch={dispatch} />
            </Tab>
            <Tab label="Exam" icon={<AvPlaylistAddCheck />} value="exam" >
              <ExamList exams={exams} dispatch={dispatch} />
            </Tab>
          </Tabs>
        </Dialog>
      </div>
    );
  }
}

EditModule.propTypes = {

};

export default EditModule;
