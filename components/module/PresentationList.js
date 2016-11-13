import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, IconButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';

import Presentation from './Presentation';
import PresentationAdd from './PresentationAdd';
import { deletePresentation } from '../../actions/module/presentation';

class PresentationList extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleDelete(index) {
    const { dispatch, moduleCode } = this.props;

    dispatch(deletePresentation(moduleCode, index));
  }

  handleEdit() {
    this.refs.presentation.setState({open: true});
  }

  handleAdd() {
    this.refs.presentationAdd.setState({open: true});
  }

  render() {
    const { dispatch, moduleCode, presentations } = this.props;

    return (
      presentations.length !== 0 ? <Table
        fixedHeader={true}
        selectable={false}
      >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>No</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Present Date</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          deselectOnClickaway={false}
          showRowHover={true}
        >
          {presentations.map((presentation, i) =>
            <TableRow key={i}>
              <TableRowColumn>{i + 1}</TableRowColumn>
              <TableRowColumn>{presentation.name}</TableRowColumn>
              <TableRowColumn>{presentation.due}</TableRowColumn>
              <TableRowColumn>
                <IconButton onTouchTap={this.handleEdit}><ContentCreate /></IconButton>
                <IconButton onTouchTap={this.handleDelete.bind(this, i)}><ContentClear /></IconButton>
                <Presentation ref="presentation" index={i} presentation={presentation} dispatch={dispatch} />
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
        <span style={{opacity: '.3'}}>{"No presentation now! Add presentation if this module has!"}</span>
        <PresentationAdd ref="presentationAdd" dispatch={dispatch} moduleCode={moduleCode} />
      </div>
    );
  }
}

PresentationList.propTypes = {

};

export default PresentationList;
