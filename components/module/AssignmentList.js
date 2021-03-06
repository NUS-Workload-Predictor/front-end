import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, IconButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';

import Assignment from './Assignment';
import AssignmentAdd from './AssignmentAdd';
import { deleteAssignment } from '../../actions/module/assignment';

class AssignmentList extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleDelete(index) {
    const { dispatch, moduleCode } = this.props;

    dispatch(deleteAssignment(moduleCode, index));
  }

  handleEdit(index) {
    this.refs['assignment'+index].setState({open: true});
  }

  handleAdd() {
    this.refs.assignmentAdd.setState({open: true});
  }

  render() {
    const { dispatch, moduleCode, assignments } = this.props;

    return (
      assignments.length !== 0 ? <Table
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
              <AssignmentAdd ref="assignmentAdd" dispatch={dispatch} moduleCode={moduleCode} />
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          deselectOnClickaway={false}
          showRowHover={true}
        >
          {assignments.map((assignment, i) =>
            <TableRow key={i}>
              <TableRowColumn>{i + 1}</TableRowColumn>
              <TableRowColumn>{assignment.name}</TableRowColumn>
              <TableRowColumn>{assignment.due}</TableRowColumn>
              <TableRowColumn>
                <IconButton onTouchTap={this.handleEdit.bind(this, i)}><ContentCreate /></IconButton>
                <IconButton onTouchTap={this.handleDelete.bind(this, i)}><ContentClear /></IconButton>
                <Assignment ref={'assignment' + i} index={i} assignment={assignment} dispatch={dispatch} moduleCode={moduleCode} />
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
        <span style={{opacity: '.3'}}>{"No assignment now! Add assignment if this module has!"}</span>
        <AssignmentAdd ref="assignmentAdd" dispatch={dispatch} moduleCode={moduleCode} />
      </div>
    );
  }
}

AssignmentList.propTypes = {

};

export default AssignmentList;
