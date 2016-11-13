import React, { Component, PropTypes } from 'react';
import { DatePicker, Dialog, FlatButton, TextField } from 'material-ui';

import { addReading } from '../../actions/module/reading';

class ReadingAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      reading: {
        name: '',
        week: '',
        amount: '',
        difficulty: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {
    this.setState({
      reading: {
        name: this.refs.name.getValue(),
        week: this.refs.week.getValue(),
        amount: this.refs.amount.getValue(),
        difficulty: this.refs.difficulty.getValue()
      }
    });
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleSubmit() {
    const { moduleCode, dispatch } = this.props;
    dispatch(addReading(moduleCode, {...this.state.reading}));

    this.setState({open: false});
  }

  render() {
    const { dispatch, moduleCode } = this.props;

    return (
      <Dialog
        title="Add New Reading"
        contentStyle={{width: '40%', maxWidth: 'none'}}
        actions={[<FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleClose}
        />,
        <FlatButton
          label="Save"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.handleSubmit}
        />]}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
      >
        <br />
        <TextField
          hintText="Enter reading name"
          floatingLabelText="Reading Name"
          floatingLabelFixed={true}
          onChange={this.handleChange}
          ref="name"
        />
        <br />
        <TextField
          hintText="Enter reading week"
          floatingLabelText="Reading Week"
          floatingLabelFixed={true}
          onChange={this.handleChange}
          ref="week"
        />
        <br />
        <TextField
          hintText="Enter reading amount"
          floatingLabelText="Reading Amount"
          floatingLabelFixed={true}
          onChange={this.handleChange}
          ref="amount"
        />
        <br />
        <TextField
          hintText="Enter reading difficulty"
          floatingLabelText="Reading Difficulty"
          floatingLabelFixed={true}
          onChange={this.handleChange}
          ref="difficulty"
        />
        <br />
      </Dialog>
    );
  }
}

ReadingAdd.propTypes = {

};

export default ReadingAdd;
