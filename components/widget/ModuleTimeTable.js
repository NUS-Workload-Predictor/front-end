import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, IconButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import '../../stylesheets/widget/ModuleTimeTable.scss';

class ModuleTimeTable extends Component {
  constructor(props) {
    super(props);

    this.state = { display: 1 };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({ display: value });
  }

  render() {
    const { widget, modules } = this.props;

    return (
      <div>
        <SelectField
          floatingLabelText="Frequency"
          value={this.state.display}
          onChange={this.handleChange}
        >
          <MenuItem primaryText="Simple" value={1} />
          <MenuItem primaryText="Complex" value={2} />
        </SelectField>
        <Table fixedHeader={true} selectable={false}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn className="module-cell">Module</TableHeaderColumn>
              <TableHeaderColumn>1</TableHeaderColumn>
              <TableHeaderColumn>2</TableHeaderColumn>
              <TableHeaderColumn>3</TableHeaderColumn>
              <TableHeaderColumn>4</TableHeaderColumn>
              <TableHeaderColumn>5</TableHeaderColumn>
              <TableHeaderColumn>6</TableHeaderColumn>
              <TableHeaderColumn className="no-padding">Recess</TableHeaderColumn>
              <TableHeaderColumn>7</TableHeaderColumn>
              <TableHeaderColumn>8</TableHeaderColumn>
              <TableHeaderColumn>9</TableHeaderColumn>
              <TableHeaderColumn>10</TableHeaderColumn>
              <TableHeaderColumn>11</TableHeaderColumn>
              <TableHeaderColumn>12</TableHeaderColumn>
              <TableHeaderColumn>13</TableHeaderColumn>
              <TableHeaderColumn className="no-padding">Reading</TableHeaderColumn>
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
      </div>
    );
  }
}

ModuleTimeTable.propTypes = {

};

export default ModuleTimeTable;
