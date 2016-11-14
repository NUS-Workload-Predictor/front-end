import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, IconButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';

import Project from './Project';
import ProjectAdd from './ProjectAdd';
import { deleteProject } from '../../actions/module/project';

class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleDelete(index) {
    const { dispatch, moduleCode } = this.props;

    dispatch(deleteProject(moduleCode, index));
  }

  handleEdit(index) {
    this.refs['project' + index].setState({open: true});
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
            <TableHeaderColumn>
              <FloatingActionButton mini={true} secondary={true} onTouchTap={this.handleAdd} style={{marginLeft: '25px'}}>
                <ActionNoteAdd />
              </FloatingActionButton>
              <ProjectAdd ref="projectAdd" dispatch={dispatch} moduleCode={moduleCode} />
            </TableHeaderColumn>
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
                <IconButton onTouchTap={this.handleEdit.bind(this, i)}><ContentCreate /></IconButton>
                <IconButton onTouchTap={this.handleDelete.bind(this, i)}><ContentClear /></IconButton>
                <Project ref={'project' + i} index={i} project={project} dispatch={dispatch} moduleCode={moduleCode} />
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
