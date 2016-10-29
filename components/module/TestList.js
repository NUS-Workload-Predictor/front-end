import React, { Component, PropTypes } from 'react';
import { IconButton, Paper, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';

import Test from './Test';

class TestList extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete() {

  }

  handleEdit() {
    this.refs.test.setState({open: true});
  }

  render() {
    const { dispatch, tests } = this.props;

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
                <IconButton onTouchTap={this.handleDelete}><ContentClear /></IconButton>
                <Test ref="test" index={i} test={test} dispatch={dispatch} />
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table> : <div style={{width: '100%', height: '80px', textAlign: 'center', paddingTop: '20px'}}>
        <ActionNoteAdd style={{opacity: '.2', fill: '#848484', strokeWidth: '5px', verticalAlign: 'middle', height: '40px', width: '40px'}} />
        <br />
        <br />
        <span style={{opacity: '.3'}}>{"No test now! Add test if this module has!"}</span>
      </div>
    );
  }
}

TestList.propTypes = {

};

export default TestList;
