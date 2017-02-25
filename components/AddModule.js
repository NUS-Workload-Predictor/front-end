import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { AutoComplete, Dialog, FlatButton, FloatingActionButton, TextField } from 'material-ui';
import FileCreateNewFolder from 'material-ui/svg-icons/file/create-new-folder';

import { addModule } from '../actions/module';
import { NUSMODS_API_BASE_URL, ACADEMIC_YEAR, SEMESTER } from '../constants/constants';

class AddModule extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, code: '' };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.setState({ open: true, code: '' });
  }

  handleClose() {
    this.setState({open: false, code: '' });
  }

  handleSubmit() {
    const { dispatch } = this.props;
    let self = this;

    fetch(NUSMODS_API_BASE_URL + ACADEMIC_YEAR + '/' + SEMESTER + '/modules/' + this.state.code + ".json")
    .then(function(response) {
      response.json().then(function(json) {
        dispatch(addModule(json));
        self.setState({open: false});
      });
    });
  }

  render() {
    const moduleList = Object.entries(this.props.moduleList).map((module) => module[0] + ' ' + module[1]);

    return (
      <div>
        <FloatingActionButton onTouchTap={this.handleOpen} mini={true} style={{position: 'absolute', right: '20px', bottom: '20px'}}>
          <FileCreateNewFolder />
        </FloatingActionButton>
        <Dialog
          title="Add New Module"
          actions={[<FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="OK"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleSubmit}
          />]}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <AutoComplete
            floatingLabelText="Module Code"
            hintText="Enter module code here ..."
            searchText={this.state.code}
            onUpdateInput={() => {

            }}
            onNewRequest={(chosenRequest) => {
              this.setState({ code: chosenRequest.split(' ')[0] });
            }}
            dataSource={moduleList}
            filter={AutoComplete.fuzzyFilter}
            openOnFocus={false}
            fullWidth={true}
            maxSearchResults={20}
          />
          <br />
        </Dialog>
      </div>
    );
  }
}

AddModule.propTypes = {

};

const mapStateToProps = (state) => ({
  moduleList: state.moduleList
});

export default connect(mapStateToProps)(AddModule);
