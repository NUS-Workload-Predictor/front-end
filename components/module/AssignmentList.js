import React, { Component, PropTypes } from 'react';
import { IconButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import ContentCreate from 'material-ui/svg-icons/content/create'
import ContentClear from 'material-ui/svg-icons/content/clear'

import Assignment from './Assignment';

class AssignmentList extends Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    this.refs.assignment.setState({open: true});
  }

  render() {
    return (
      <Table
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
          <TableRow>
            <TableRowColumn>1</TableRowColumn>
            <TableRowColumn>Assignment 1</TableRowColumn>
            <TableRowColumn>2016-10-30</TableRowColumn>
            <TableRowColumn>
              <IconButton onTouchTap={this.handleEdit}><ContentCreate /></IconButton>
              <IconButton onTouchTap={this.handleEdit}><ContentClear /></IconButton>
              <Assignment ref="assignment" />
            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>1</TableRowColumn>
            <TableRowColumn>Assignment 1</TableRowColumn>
            <TableRowColumn>2016-10-30</TableRowColumn>
            <TableRowColumn>
              <IconButton onTouchTap={this.handleEdit}><ContentCreate /></IconButton>
              <IconButton onTouchTap={this.handleEdit}><ContentClear /></IconButton>

            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>1</TableRowColumn>
            <TableRowColumn>Assignment 1</TableRowColumn>
            <TableRowColumn>2016-10-30</TableRowColumn>
            <TableRowColumn>
              <IconButton onTouchTap={this.handleEdit}><ContentCreate /></IconButton>
              <IconButton onTouchTap={this.handleEdit}><ContentClear /></IconButton>
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

AssignmentList.propTypes = {

};

export default AssignmentList;
