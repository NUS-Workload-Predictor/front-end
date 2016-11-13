import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, IconButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';

import Reading from './Reading';
import ReadingAdd from './ReadingAdd';
import { deleteReading } from '../../actions/module/reading';

class ReadingList extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleDelete(index) {
    const { dispatch, moduleCode } = this.props;

    dispatch(deleteReading(moduleCode, index));
  }

  handleEdit(index) {
    this.refs['reading' + index].setState({open: true});
  }

  handleAdd() {
    this.refs.readingAdd.setState({open: true});
  }

  render() {
    const { dispatch, moduleCode, readings } = this.props;

    return (
      readings.length !== 0 ? <Table
        fixedHeader={true}
        selectable={false}
      >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>No</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Week No</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          deselectOnClickaway={false}
          showRowHover={true}
        >
          {readings.map((reading, i) =>
            <TableRow key={i}>
              <TableRowColumn>{i + 1}</TableRowColumn>
              <TableRowColumn>{reading.name}</TableRowColumn>
              <TableRowColumn>{reading.week}</TableRowColumn>
              <TableRowColumn>
                <IconButton onTouchTap={this.handleEdit.bind(this, i)}><ContentCreate /></IconButton>
                <IconButton onTouchTap={this.handleDelete.bind(this, i)}><ContentClear /></IconButton>
                <Reading ref={'reading' + i} index={i} reading={reading} dispatch={dispatch} moduleCode={moduleCode} />
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
        <span style={{opacity: '.3'}}>{"No reading now! Add reading if this module has!"}</span>
        <ReadingAdd ref="readingAdd" dispatch={dispatch} moduleCode={moduleCode} />
      </div>
    );
  }
}

ReadingList.propTypes = {

};

export default ReadingList;
