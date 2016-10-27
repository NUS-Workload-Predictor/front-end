import React, { Component, PropTypes } from 'react';
import { DatePicker, Dialog, FlatButton, TextField } from 'material-ui';

class Reading extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleSubmit() {

  }

  render() {
    const { dispatch, reading } = this.props;

    return (
      <Dialog
        title="Edit Reading Details"
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
          defaultValue={reading.name}
        />
        <br />
        <TextField
          hintText="Enter reading week"
          floatingLabelText="Reading Week"
          floatingLabelFixed={true}
          defaultValue={reading.week}
        />
        <br />
        <TextField
          hintText="Enter reading amount"
          floatingLabelText="Reading Amount"
          floatingLabelFixed={true}
          defaultValue={reading.amount}
        />
        <br />
        <TextField
          hintText="Enter reading difficulty"
          floatingLabelText="Reading Difficulty"
          floatingLabelFixed={true}
          defaultValue={reading.difficulty}
        />
        <br />
      </Dialog>
    );
  }
}

Reading.propTypes = {

};

export default Reading;
