import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, IconButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';

import Exam from './Exam';
import ExamAdd from './ExamAdd';
import { deleteExam } from '../../actions/module/exam';

class ExamList extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleDelete(index) {
    const { dispatch, moduleCode } = this.props;

    dispatch(deleteExam(moduleCode, index));
  }

  handleEdit(index) {
    this.refs['exam' + index].setState({open: true});
  }

  handleAdd() {
    this.refs.examAdd.setState({open: true});
  }

  render() {
    const { dispatch, moduleCode, exams } = this.props;

    return (
      exams.length !== 0 ? <Table
        fixedHeader={true}
        selectable={false}
      >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>No</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Exam Date</TableHeaderColumn>
            <TableHeaderColumn>
              <FloatingActionButton mini={true} secondary={true} onTouchTap={this.handleAdd} style={{marginLeft: '25px'}}>
                <ActionNoteAdd />
              </FloatingActionButton>
              <ExamAdd ref="examAdd" dispatch={dispatch} moduleCode={moduleCode} />
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          deselectOnClickaway={false}
          showRowHover={true}
        >
          {exams.map((exam, i) =>
            <TableRow key={i}>
              <TableRowColumn>{i + 1}</TableRowColumn>
              <TableRowColumn>{exam.name}</TableRowColumn>
              <TableRowColumn>{exam.date}</TableRowColumn>
              <TableRowColumn>
                <IconButton onTouchTap={this.handleEdit.bind(this, i)}><ContentCreate /></IconButton>
                <IconButton onTouchTap={this.handleDelete.bind(this, i)}><ContentClear /></IconButton>
                <Exam ref={'exam' + i} index={i} exam={exam} dispatch={dispatch} moduleCode={moduleCode} />
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
        <span style={{opacity: '.3'}}>{"No exam now! Add exam if this module has!"}</span>
        <ExamAdd ref="examAdd" dispatch={dispatch} moduleCode={moduleCode} />
      </div>
    );
  }
}

ExamList.propTypes = {

};

export default ExamList;
