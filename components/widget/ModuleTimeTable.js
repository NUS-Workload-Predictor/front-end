import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, IconButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';

import '../../stylesheets/widget/ModuleTimeTable.scss';

class ModuleTimeTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { widget, modules } = this.props;

    return (
      <Table fixedHeader={true} selectable={false}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn className="module-cell">Module</TableHeaderColumn>
            <TableHeaderColumn>Week 1</TableHeaderColumn>
            <TableHeaderColumn>2</TableHeaderColumn>
            <TableHeaderColumn>3</TableHeaderColumn>
            <TableHeaderColumn>4</TableHeaderColumn>
            <TableHeaderColumn>5</TableHeaderColumn>
            <TableHeaderColumn>6</TableHeaderColumn>
            <TableHeaderColumn>Recess</TableHeaderColumn>
            <TableHeaderColumn>7</TableHeaderColumn>
            <TableHeaderColumn>8</TableHeaderColumn>
            <TableHeaderColumn>9</TableHeaderColumn>
            <TableHeaderColumn>10</TableHeaderColumn>
            <TableHeaderColumn>11</TableHeaderColumn>
            <TableHeaderColumn>12</TableHeaderColumn>
            <TableHeaderColumn>13</TableHeaderColumn>
            <TableHeaderColumn>Reading</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          deselectOnClickaway={false}
          showRowHover={false}
        >
          {modules.map((module, i) =>
            <TableRow key={i}>
              <TableRowColumn className="module-cell">{module.code}</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
              <TableRowColumn>0</TableRowColumn>
            </TableRow>
          )}
          <TableRow>
            <TableRowColumn className="module-cell">Total</TableRowColumn>
            <TableRowColumn>0</TableRowColumn>
            <TableRowColumn>0</TableRowColumn>
            <TableRowColumn>0</TableRowColumn>
            <TableRowColumn>0</TableRowColumn>
            <TableRowColumn>0</TableRowColumn>
            <TableRowColumn>0</TableRowColumn>
            <TableRowColumn>0</TableRowColumn>
            <TableRowColumn>0</TableRowColumn>
            <TableRowColumn>0</TableRowColumn>
            <TableRowColumn>0</TableRowColumn>
            <TableRowColumn>0</TableRowColumn>
            <TableRowColumn>0</TableRowColumn>
            <TableRowColumn>0</TableRowColumn>
            <TableRowColumn>0</TableRowColumn>
            <TableRowColumn>0</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

ModuleTimeTable.propTypes = {

};

export default ModuleTimeTable;
