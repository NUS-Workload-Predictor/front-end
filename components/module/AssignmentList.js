import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, IconButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';

import Assignment from './Assignment';

class AssignmentList extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleDelete() {

  }

  handleEdit() {
    this.refs.assignment.setState({open: true});
  }

  handleAdd() {
    console.log("haha");
  }

  render() {
    const { dispatch, assignments } = this.props;

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
            <TableHeaderColumn></TableHeaderColumn>
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
                <IconButton onTouchTap={this.handleEdit}><ContentCreate /></IconButton>
                <IconButton onTouchTap={this.handleDelete}><ContentClear /></IconButton>
                <Assignment ref="assignment" index={i} assignment={assignment} dispatch={dispatch} />
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table> : <div style={{width: '100%', height: '80px', textAlign: 'center', paddingTop: '20px'}}>
        <FloatingActionButton>
          <ActionNoteAdd />
        </FloatingActionButton>
        <br />
        <br />
        <span style={{opacity: '.3'}}>{"No assignment now! Add assignment if this module has!"}</span>
      </div>
    );
  }
}

AssignmentList.propTypes = {

};

export default AssignmentList;
