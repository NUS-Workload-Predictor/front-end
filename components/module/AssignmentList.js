import React, { Component, PropTypes } from 'react';
import { IconButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';

import NavigationClose from 'material-ui/svg-icons/navigation/close'

class AssignmentList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table
        fixedHeader={true}
        multiSelectable={true}
      >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>NO</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Deadline</TableHeaderColumn>
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
          </TableRow>
          <TableRow>
            <TableRowColumn>1</TableRowColumn>
            <TableRowColumn>Assignment 1</TableRowColumn>
            <TableRowColumn>2016-10-30</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>1</TableRowColumn>
            <TableRowColumn>Assignment 1</TableRowColumn>
            <TableRowColumn>2016-10-30</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

AssignmentList.propTypes = {

};

export default AssignmentList;
