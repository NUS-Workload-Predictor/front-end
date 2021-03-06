import React, { Component, PropTypes } from 'react';
import { DatePicker, Dialog, FlatButton, Snackbar, TextField } from 'material-ui';

import { editPresentation } from '../../actions/module/presentation';

class Presentation extends Component {
  constructor(props) {
    super(props);
    const { presentation } = this.props;

    this.state = {
      open: false,
      openSnackbar: false,
      presentation: presentation
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  formatDate(date) {
    if (date) {
      let year = date.getFullYear();
      let month = date.getMonth() < 9 ? '0' + date.getMonth() : date.getMonth() + 1;
      let day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();

      return year + '-' + month + '-' + day;
    }

    return '';
  }

  handleChange() {
    this.setState({
      presentation: {
        name: this.refs.name.getValue(),
        released: this.formatDate(this.refs.released.state.date),
        releasedWeek: this.refs.releasedWeek.getValue(),
        due: this.formatDate(this.refs.due.state.date),
        dueWeek: this.refs.dueWeek.getValue(),
        percentage: this.refs.percentage.getValue(),
        coverage: this.refs.coverage.getValue(),
        people: this.refs.people.getValue(),
        duration: this.refs.duration.getValue()
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
    let allFilled = true;
    let presentation = this.state.presentation;
    Object.keys(presentation).forEach(function(key,index) {
      if (!presentation[key]) {
        allFilled = false;
      }
    });

    if (allFilled) {
      dispatch(editPresentation(moduleCode, index, {...this.state.presentation}));

      this.setState({open: false});
    } else {
      this.setState({openSnackbar: true});
    }
  }

  render() {
    const { dispatch, presentation } = this.props;
    const releasedDate = new Date(presentation.released);
    const dueDate = new Date(presentation.due);

    return (
      <Dialog
        title="Edit Presentation Details"
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
        <Snackbar
          open={this.state.openSnackbar}
          message="Must fill in all fields"
          autoHideDuration={3000}
          onRequestClose={() => {
              this.setState({
                openSnackbar: false,
              });
            }
          }
        />
        <br />
        <TextField
          hintText="Enter presentation name"
          floatingLabelText="Presentation Name"
          floatingLabelFixed={true}
          defaultValue={presentation.name}
          onChange={this.handleChange}
          ref="name"
        />
        <br />
        <DatePicker
          autoOk={true}
          defaultDate={releasedDate}
          hintText="Select released date"
          floatingLabelText="Released Date"
          onChange={this.handleChange}
          ref="released"
        />
        <br />
        <TextField
          hintText="Enter presentation released week"
          floatingLabelText="Presentation Released Week"
          floatingLabelFixed={true}
          defaultValue={presentation.releasedWeek}
          onChange={this.handleChange}
          ref="releasedWeek"
        />
        <br />
        <DatePicker
          autoOk={true}
          defaultDate={dueDate}
          hintText="Select due date"
          floatingLabelText="Due Date"
          onChange={this.handleChange}
          ref="due"
        />
        <br />
        <TextField
          hintText="Enter presentation due week"
          floatingLabelText="Presentation Due Week"
          floatingLabelFixed={true}
          defaultValue={presentation.dueWeek}
          onChange={this.handleChange}
          ref="dueWeek"
        />
        <br />
        <TextField
          hintText="Enter presentation percentage"
          floatingLabelText="Presentation Percentage"
          floatingLabelFixed={true}
          defaultValue={presentation.percentage}
          onChange={this.handleChange}
          ref="percentage"
        />
        <br />
        <TextField
          hintText="Enter presentation coverage"
          floatingLabelText="Presentation Coverage"
          floatingLabelFixed={true}
          defaultValue={presentation.coverage}
          onChange={this.handleChange}
          ref="coverage"
        />
        <br />
        <TextField
          hintText="Enter presentation people"
          floatingLabelText="Presentation People"
          floatingLabelFixed={true}
          defaultValue={presentation.people}
          onChange={this.handleChange}
          ref="people"
        />
        <br />
        <TextField
          hintText="Enter presentation duration"
          floatingLabelText="Presentation Duration"
          floatingLabelFixed={true}
          defaultValue={presentation.duration}
          onChange={this.handleChange}
          ref="duration"
        />
        <br />
      </Dialog>
    );
  }
}

Presentation.propTypes = {

};

export default Presentation;
