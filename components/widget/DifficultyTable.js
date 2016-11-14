import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, IconButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';

class DifficultyTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { widget, modules } = this.props;
    const { width, height } = widget;

    return (
      <Table style={{width, height}}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>No.</TableHeaderColumn>
            <TableHeaderColumn>Module</TableHeaderColumn>
            <TableHeaderColumn>Difficulty</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {modules.map((module, i) =>
            <TableRow>
              <TableRowColumn>{i + 1}</TableRowColumn>
              <TableRowColumn>{module.code}</TableRowColumn>
              <TableRowColumn>4.44</TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}

DifficultyTable.propTypes = {

};

export default DifficultyTable;
