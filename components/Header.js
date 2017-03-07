import React, { Component, PropTypes } from 'react';
import { AppBar, Checkbox, Dialog, Drawer, FlatButton, IconButton, IconMenu, List, ListItem, MenuItem, Subheader, TextField, Toggle } from 'material-ui';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionBook from 'material-ui/svg-icons/action/book';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import ActionSpellcheck from 'material-ui/svg-icons/action/spellcheck';
import AvMic from 'material-ui/svg-icons/av/mic';
import AvPlaylistAddCheck from 'material-ui/svg-icons/av/playlist-add-check';
import { deepOrangeA400, grey50, grey400 } from 'material-ui/styles/colors';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import fetchJsonp from 'fetch-jsonp';

import ModuleListContainer from '../containers/ModuleListContainer';
import { setModuleList } from '../actions/moduleList';
import { addModule } from '../actions/module';

import { IVLE_API_KEY, REDIRECT_URL, IVLE_API_BASE_URL, NUSMODS_API_BASE_URL, ACADEMIC_YEAR, SEMESTER, TRAINING_SERVER_URL } from '../constants/constants';

const ivleLogin = 'https://ivle.nus.edu.sg/api/login/?apikey=' + IVLE_API_KEY + '&url=' + REDIRECT_URL;
const defaultExpire = 30;
const tokenName = 'token';

const updateDataUrl = TRAINING_SERVER_URL + '/data/';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {logged: false, open: false, feedback: false, profile: false};

    let token = this.getCookie(tokenName);

    // for test purpose
    // should be removed after test
    console.log(token);

    if (token) {
      this.state = { ...this.state, logged: true };
    } else {
      token = this.getTokenFromUrl();
      if (token) {
        this.state = { ...this.state, logged: true };
        this.saveTokenToCookie(token);
        window.location.href = REDIRECT_URL;
      }
    }

    if (token) {
      this.getModules(token, this.props.dispatch);
    }

    this.getModuleList(this.props.dispatch);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleFeedback = this.handleFeedback.bind(this);
    this.handleSendFeedback = this.handleSendFeedback.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
  }

  getModules(token, dispatch) {
    let url = IVLE_API_BASE_URL + 'Modules?APIKey=' + IVLE_API_KEY + '&AuthToken=' + token + '&Duration=10&IncludeAllInfo=false&output=json';
    let self = this;

    fetchJsonp(url).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.Results.map((module) => self.addModule(module.CourseCode, dispatch));
    });
  }

  addModule(moduleCode, dispatch) {
    let moduleList = this.props.moduleList;
    if (!moduleList[moduleCode]) {
      return;
    }

    let url = NUSMODS_API_BASE_URL + ACADEMIC_YEAR + '/' + SEMESTER + '/modules/' + moduleCode + ".json";

    fetch(url).then(function(response) {
      return response.json();
    }).then(function(json) {
      dispatch(addModule(json));
    });
  }

  getModuleList(dispatch) {
    let url = NUSMODS_API_BASE_URL + ACADEMIC_YEAR + '/' + SEMESTER + '/moduleList.json';

    fetch(url).then(function(response) {
      return response.json();
    }).then(function(json) {
      dispatch(setModuleList(json));
    });
  }

  getTokenFromUrl() {
    let url = window.location.href;
    let name = tokenName;

    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    let results = regex.exec(url);

    if (!results) {
      return null;
    }

    if (!results[2]) {
      return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  saveTokenToCookie(token) {
    const name = tokenName;

    this.removeCookie(name);
    this.setCookie(name, token, defaultExpire);
  }

  setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  getCookie(name) {
    let nameEqual = name + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEqual) == 0) {
          return c.substring(nameEqual.length, c.length);
        }
    }
    return null;
  }

  removeCookie(name) {
    this.setCookie(name, "", -1);
  }

  handleLogin() {
    window.location.href = ivleLogin;
  }

  handleLogout() {
    this.removeCookie(tokenName);
    this.setState({logged: false});
    window.location.href = REDIRECT_URL;
  }

  handleProfile() {
    this.setState({profile: !this.state.profile});
  }

  handleFeedback() {
    this.setState({feedback: !this.state.feedback});
  }

  handleSendFeedback() {
    const { modules } = this.props;

    modules.map((module, i) => {
      module.assignments.map((assignment, i) => {
        let truth = parseFloat(this.refs[module.code + '-assignment-' + i].getValue());
        let url = updateDataUrl + 'workload/assignment/' + module.code;

        if (truth && !isNaN(truth)) {
          let params = {
            time: assignment.dueWeek - assignment.releasedWeek + 1,
            percentage: assignment.percentage,
            coverage: assignment.coverage,
            people: assignment.people,
            result: truth
          };
          let body = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
          }).join('&');

          let config = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: body
          };

          fetch(url, config).then((response) => {
            return response.json();
          }).then((json) => {console.log(json)});
        }
      });

      module.projects.map((project, i) => {
        let truth = parseFloat(this.refs[module.code + '-project-' + i].getValue());
        let url = updateDataUrl + 'workload/project/' + module.code;

        if (truth && !isNaN(truth)) {
          let params = {
            time: project.dueWeek - project.releasedWeek + 1,
            percentage: project.percentage,
            coverage: project.coverage,
            people: project.people,
            result: truth
          };
          let body = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
          }).join('&');

          let config = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: body
          };

          fetch(url, config).then((response) => {
            return response.json();
          }).then((json) => {console.log(json)});
        }
      });

      module.presentations.map((presentation, i) => {
        let truth = parseFloat(this.refs[module.code + '-presentation-' + i].getValue());
        let url = updateDataUrl + 'workload/presentation/' + module.code;

        if (truth && !isNaN(truth)) {
          let params = {
            time: presentation.dueWeek - presentation.releasedWeek + 1,
            percentage: presentation.percentage,
            coverage: presentation.coverage,
            people: presentation.people,
            duration: presentation.duration,
            result: truth
          };
          let body = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
          }).join('&');

          let config = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: body
          };

          fetch(url, config).then((response) => {
            return response.json();
          }).then((json) => {console.log(json)});
        }
      });

      module.readings.map((reading, i) => {
        let truth = parseFloat(this.refs[module.code + '-reading-' + i].getValue());
        let url = updateDataUrl + 'workload/reading/' + module.code;

        if (truth && !isNaN(truth)) {
          let params = {
            amount: reading.amount,
            difficulty: reading.difficulty,
            result: truth
          };
          let body = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
          }).join('&');

          let config = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: body
          };

          fetch(url, config).then((response) => {
            return response.json();
          }).then((json) => {console.log(json)});
        }
      });

      module.tests.map((test, i) => {
        let truth = parseFloat(this.refs[module.code + '-test-' + i].getValue());
        let url = updateDataUrl + 'workload/test/' + module.code;

        if (truth && !isNaN(truth)) {
          let params = {
            percentage: test.percentage,
            coverage: test.coverage,
            duration: test.duration,
            result: truth
          };
          let body = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
          }).join('&');

          let config = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: body
          };

          fetch(url, config).then((response) => {
            return response.json();
          }).then((json) => {console.log(json)});
        }
      });

      module.exams.map((exam, i) => {
        let truth = parseFloat(this.refs[module.code + '-exam-' + i].getValue());
        let url = updateDataUrl + 'workload/exam/' + module.code;

        if (truth && !isNaN(truth)) {
          let params = {
            percentage: exam.percentage,
            coverage: exam.coverage,
            duration: exam.duration,
            result: truth
          };
          let body = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
          }).join('&');

          let config = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: body
          };

          fetch(url, config).then((response) => {
            return response.json();
          }).then((json) => {console.log(json)});
        }
      });
    });

    this.setState({feedback: !this.state.feedback});
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  render() {
    const { modules } = this.props;

    return (
      <div>
        <AppBar
          title="NUSWorks"
          style={{position: 'fixed'}}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={<IconButton><NavigationExpandMore /></IconButton>}
          iconElementRight={this.state.logged
            ? <IconMenu iconButtonElement={
                <IconButton>
                  <MoreHorizIcon />
                </IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              style={{color: grey50}}>
                <MenuItem onTouchTap={this.handleProfile} primaryText="Profile" />
                <MenuItem onTouchTap={this.handleFeedback} primaryText="Feedback" />
                <MenuItem onTouchTap={this.handleLogout} primaryText="Logout" />
              </IconMenu>
            : <FlatButton onTouchTap={this.handleLogin} style={{color: grey50}} label="Login" />
          }
        />
        <Drawer docked={false} width={350} open={this.state.open} onRequestChange={(open) => this.setState({open})} containerStyle={{height: '70%', top: 70}}>
          <ModuleListContainer />
        </Drawer>
        <Dialog
          title="Profile"
          actions={[<FlatButton
            label="OK"
            primary={true}
            onTouchTap={this.handleProfile}
          />]}
          modal={false}
          open={this.state.profile}
          onRequestClose={this.handleProfile}
          autoScrollBodyContent={true}
        ></Dialog>
        <Dialog
          title="Send Feedback"
          actions={[<FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleFeedback}
          />,
          <FlatButton
            label="Send"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleSendFeedback}
          />]}
          modal={false}
          open={this.state.feedback}
          onRequestClose={this.handleFeedback}
          autoScrollBodyContent={true}
        >
          {modules.map((module, i) => {
            return (
              <List key={module + '-' + i}>
                <Subheader>{module.code + ' ' + module.title}</Subheader>
                <ListItem
                  primaryText="Assignment"
                  leftIcon={<ActionAssignment />}
                  initiallyOpen={true}
                  primaryTogglesNestedList={true}
                  nestedItems={ module.assignments.map((assignment, i) => {
                    return (
                      <ListItem
                        key={'assignment-' + i}
                        primaryText={assignment.name}
                        initiallyOpen={true}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                          <ListItem key={ 'assignment-' + i + '-0'}>
                            <TextField
                              id={'assignment-' + i + '-0-input'}
                              hintText="Keep empty if prediction is correct"
                              floatingLabelText="Actual Workload (hours/week)"
                              floatingLabelFixed={true}
                              ref={module.code + '-assignment-' + i }
                            />
                          </ListItem>
                        ]}
                      />
                    );
                  })}
                />
                <ListItem
                  primaryText="Project"
                  leftIcon={<ActionDashboard />}
                  initiallyOpen={true}
                  primaryTogglesNestedList={true}
                  nestedItems={ module.projects.map((project, i) => {
                    return (
                      <ListItem
                        key={'project-' + i}
                        primaryText={project.name}
                        initiallyOpen={true}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                          <ListItem key={'project-' + i + '-0'}>
                            <TextField
                              id={'project-' + i + '-0-input'}
                              hintText="Keep empty if prediction is correct"
                              floatingLabelText="Actual Workload (hours/week)"
                              floatingLabelFixed={true}
                              ref={module.code + '-project-' + i }
                            />
                          </ListItem>
                        ]}
                      />
                    );
                  })}
                />
                <ListItem
                  primaryText="Presentation"
                  leftIcon={<AvMic />}
                  initiallyOpen={true}
                  primaryTogglesNestedList={true}
                  nestedItems={ module.presentations.map((presentation, i) => {
                    return (
                      <ListItem
                        key={'presentation-' + i}
                        primaryText={presentation.name}
                        initiallyOpen={true}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                          <ListItem key={'presentation-' + i + '-0'}>
                            <TextField
                              id={'presentation-' + i + '-0-input'}
                              hintText="Keep empty if prediction is correct"
                              floatingLabelText="Actual Workload (hours/week)"
                              floatingLabelFixed={true}
                              ref={module.code + '-presentation-' + i }
                            />
                          </ListItem>
                        ]}
                      />
                    );
                  })}
                 />
                <ListItem
                  primaryText="Reading"
                  leftIcon={<ActionBook />}
                  initiallyOpen={true}
                  primaryTogglesNestedList={true}
                  nestedItems={ module.readings.map((reading, i) => {
                    return (
                      <ListItem
                        key={'reading-' + i}
                        primaryText={reading.name}
                        initiallyOpen={true}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                          <ListItem key={'reading-' + i + '-0'}>
                            <TextField
                              id={'reading-' + i + '-0-input'}
                              hintText="Keep empty if prediction is correct"
                              floatingLabelText="Actual Workload (hours/week)"
                              floatingLabelFixed={true}
                              ref={module.code + '-reading-' + i }
                            />
                          </ListItem>
                        ]}
                      />
                    );
                  })}
                 />
                <ListItem
                  primaryText="Test"
                  leftIcon={<ActionSpellcheck />}
                  initiallyOpen={true}
                  primaryTogglesNestedList={true}
                  nestedItems={ module.tests.map((test, i) => {
                    return (
                      <ListItem
                        key={'test-' + i}
                        primaryText={test.name}
                        initiallyOpen={true}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                          <ListItem key={'test-' + i + '-0'}>
                            <TextField
                              id={'test-' + i + '-0-input'}
                              hintText="Keep empty if prediction is correct"
                              floatingLabelText="Actual Workload (hours/week)"
                              floatingLabelFixed={true}
                              ref={module.code + '-test-' + i }
                            />
                          </ListItem>
                        ]}
                      />
                    );
                  })}
                />
                <ListItem
                  primaryText="Exam"
                  leftIcon={<AvPlaylistAddCheck />}
                  initiallyOpen={true}
                  primaryTogglesNestedList={true}
                  nestedItems={ module.exams.map((exam, i) => {
                    return (
                      <ListItem
                        key={'exam-' + i}
                        primaryText={exam.name}
                        initiallyOpen={true}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                          <ListItem key={'exam-' + i + '-0'}>
                            <TextField
                              id={'exam-' + i + '-0-input'}
                              hintText="Keep empty if prediction is correct"
                              floatingLabelText="Actual Workload (hours/week)"
                              floatingLabelFixed={true}
                              ref={module.code + '-exam-' + i }
                            />
                          </ListItem>
                        ]}
                      />
                    );
                  })}
                />
                <ListItem key={'module-difficulty'}>
                  <TextField
                    id={'module-difficulty-input'}
                    hintText="Keep empty if prediction is correct"
                    floatingLabelText="Actual Module Difficulty"
                    floatingLabelFixed={true}
                    ref={module.code + '-difficulty' }
                  />
                </ListItem>
              </List>
            );
          })}
        </Dialog>
      </div>
    );
  }
}

Header.propTypes = {

};

export default Header;
