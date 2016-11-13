import React, { Component, PropTypes } from 'react';
import { DatePicker, Dialog, FlatButton, TextField } from 'material-ui';

import { editReading } from '../../actions/module/reading';

class Reading extends Component {
  constructor(props) {
    super(props);
    const { reading } = this.props;

    this.state = {
      open: false,
      reading: reading
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
    const { moduleCode, dispatch, index } = this.props;
    dispatch(editReading(moduleCode, index, {...this.state.reading}));

    this.setState({open: false});
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
          onChange={this.handleChange}
          ref="name"
        />
        <br />
        <TextField
          hintText="Enter reading week"
          floatingLabelText="Reading Week"
          floatingLabelFixed={true}
          defaultValue={reading.week}
          onChange={this.handleChange}
          ref="week"
        />
        <br />
        <TextField
          hintText="Enter reading amount"
          floatingLabelText="Reading Amount"
          floatingLabelFixed={true}
          defaultValue={reading.amount}
          onChange={this.handleChange}
          ref="amount"
        />
        <br />
        <TextField
          hintText="Enter reading difficulty"
          floatingLabelText="Reading Difficulty"
          floatingLabelFixed={true}
          defaultValue={reading.difficulty}
          onChange={this.handleChange}
          ref="difficulty"
        />
        <br />
      </Dialog>
    );
  }
}

Reading.propTypes = {

};

export default Reading;
