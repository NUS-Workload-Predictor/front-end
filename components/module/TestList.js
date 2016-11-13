import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, IconButton, Paper, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';

import Test from './Test';
import TestAdd from './TestAdd';
import { deleteTest } from '../../actions/module/test';

class TestList extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleDelete(index) {
    const { dispatch, moduleCode } = this.props;

    dispatch(deleteTest(moduleCode, index));
  }

  handleEdit() {
    this.refs.test.setState({open: true});
  }

  handleAdd() {
    this.refs.testAdd.setState({open: true});
  }

  render() {
    const { dispatch, moduleCode, tests } = this.props;

    return (
      tests.length !== 0 ? <Table
        fixedHeader={true}
        selectable={false}
      >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>No</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Test Date</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          deselectOnClickaway={false}
          showRowHover={true}
        >
          {tests.map((test, i) =>
            <TableRow key={i}>
              <TableRowColumn>{i + 1}</TableRowColumn>
              <TableRowColumn>{test.name}</TableRowColumn>
              <TableRowColumn>{test.date}</TableRowColumn>
              <TableRowColumn>
                <IconButton onTouchTap={this.handleEdit}><ContentCreate /></IconButton>
                <IconButton onTouchTap={this.handleDelete.bind(this, i)}><ContentClear /></IconButton>
                <Test ref="test" index={i} test={test} dispatch={dispatch} />
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
        <span style={{opacity: '.3'}}>{"No test now! Add test if this module has!"}</span>
        <TestAdd ref="testAdd" dispatch={dispatch} moduleCode={moduleCode} />
      </div>
    );
  }
}

TestList.propTypes = {

};

export default TestList;
