import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, IconButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';

import Project from './Project';
import ProjectAdd from './ProjectAdd';

class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleDelete() {

  }

  handleEdit() {
    this.refs.project.setState({open: true});
  }

  handleAdd() {
    this.refs.projectAdd.setState({open: true});
  }

  render() {
    const { dispatch, moduleCode, projects } = this.props;

    return (
      projects.length !== 0 ? <Table
        fixedHeader={true}
        selectable={false}
      >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>No</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Deadline</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          deselectOnClickaway={false}
          showRowHover={true}
        >
          {projects.map((project, i) =>
            <TableRow key={i}>
              <TableRowColumn>{i + 1}</TableRowColumn>
              <TableRowColumn>{project.name}</TableRowColumn>
              <TableRowColumn>{project.due}</TableRowColumn>
              <TableRowColumn>
                <IconButton onTouchTap={this.handleEdit}><ContentCreate /></IconButton>
                <IconButton onTouchTap={this.handleDelete}><ContentClear /></IconButton>
                <Project ref="project" index={i} project={project} dispatch={dispatch} />
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table> : <div style={{width: '100%', height: '80px', textAlign: 'center', paddingTop: '20px'}}>
        <FloatingActionButton secondary={true} onTouchTap={this.handleAdd}>
          <ActionNoteAdd />
        </FloatingActionButton>
        <br />
        <br />
        <span style={{opacity: '.3'}}>{"No project now! Add project if this module has!"}</span>
        <ProjectAdd ref="projectAdd" dispatch={dispatch} moduleCode={moduleCode} />
      </div>
    );
  }
}

ProjectList.propTypes = {

};

export default ProjectList;
