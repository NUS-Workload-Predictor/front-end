import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, IconButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';

import { TRAINING_SERVER_URL } from '../../constants/constants';

const simpleDifficultyApi = TRAINING_SERVER_URL + '/workload/simple/difficulty/';
const complexDifficultyApi = TRAINING_SERVER_URL + '/workload/complex/difficulty/';

class DifficultyTable extends Component {
  constructor(props) {
    super(props);

    let simpleDifficulty = Array.apply(null, Array(props.modules.length)).map(Number.prototype.valueOf, 0.0);
    let complexDifficulty = Array.apply(null, Array(props.modules.length)).map(Number.prototype.valueOf, 0.0);
    this.state = { simpleDifficulty: simpleDifficulty, complexDifficulty: complexDifficulty };
  }

  getDifficultyParams(module, type) {
    let url = type === 'simple' ? simpleDifficultyApi + module : complexDifficultyApi + module;
    return fetch(url).then(function(response) {
      return response.json();
    });
  }

  getDifficultyDefault(module) {
    for (let i = 0; i < module.code.length; i++) {
      if (!isNaN(parseInt(module.code[i]))) {
        return parseInt(module.code[i]) * 1.0;
      }
    }
  }

  getSimpleDifficulty(module, index) {
    let difficulty = 0.0;

    return this.getDifficultyParams(module.code, 'simple').then((coefficients) => {
      if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
        difficulty = this.getDifficultyDefault(module);
      } else {
        difficulty = parseInt(module.code[/[0-9]/.exec(module.code).index]) * coefficients.level
          + parseInt(module.credit) * coefficients.mc
          + module.lecture * coefficients.lecture
          + module.tutorial * coefficients.tutorial
          + module.lab * coefficients.lab
          + module.project * coefficients.project
          + module.preparation * coefficients.preparation
          + coefficients.intercept;
      }
      difficulty = this.getDifficultyDefault(module);
      difficulty = difficulty.toFixed(2);
      return difficulty;
    });
  }

  getComplexDifficulty(module, profile, index) {
    let difficulty = 0.0;

    return this.getDifficultyParams(module.code, 'complex').then((coefficients) => {
      if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
        difficulty = this.getDifficultyDefault(module);
      } else {
        difficulty = profile.cap * coefficients.cap
          + profile.experiencedMc * coefficients.mc
          + profile.experiencedSem * coefficients.semesters
          + parseInt(module.code[/[0-9]/.exec(module.code).index]) * coefficients.level
          + parseInt(module.credit) * coefficients.mc
          + module.lecture * coefficients.lecture
          + module.tutorial * coefficients.tutorial
          + module.lab * coefficients.lab
          + module.project * coefficients.project
          + module.preparation * coefficients.preparation
          + coefficients.intercept;
      }
      difficulty = this.getDifficultyDefault(module);
      difficulty = difficulty.toFixed(2);
      return difficulty;
    });
  }

  componentDidMount() {
    const { modules, profile } = this.props;
    let simpleDifficultyList = [];
    let complexDifficultyList = [];

    let simple = modules.reduce((promise, module, index) => {
      return promise.then(() => {
        return this.getSimpleDifficulty(module, index).then((difficulty) => {
          simpleDifficultyList[index] = difficulty;
        });
      });
    }, Promise.resolve());

    let complex = modules.reduce((promise, module, index) => {
      return promise.then(() => {
        return this.getComplexDifficulty(module, profile, index).then((difficulty) => {
          complexDifficultyList[index] = difficulty;
        });
      });
    }, Promise.resolve());

    Promise.all([simple, complex]).then(() => {
      this.setState({
        simpleDifficulty: simpleDifficultyList,
        complexDifficulty: complexDifficultyList
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { modules, profile } = nextProps;
    let simpleDifficultyList = [];
    let complexDifficultyList = [];

    let simple = modules.reduce((promise, module, index) => {
      return promise.then(() => {
        return this.getSimpleDifficulty(module, index).then((difficulty) => {
          simpleDifficultyList[index] = difficulty;
        });
      });
    }, Promise.resolve());

    let complex = modules.reduce((promise, module, index) => {
      return promise.then(() => {
        return this.getComplexDifficulty(module, profile, index).then((difficulty) => {
          complexDifficultyList[index] = difficulty;
        });
      });
    }, Promise.resolve());

    Promise.all(simple, complex).then(() => {
      this.setState({
        simpleDifficulty: simpleDifficultyList,
        complexDifficulty: complexDifficultyList
      });
    });
  }

  render() {
    const { widget, modules, profile } = this.props;
    const { simpleDifficulty, complexDifficulty } = this.state;

    return (
      <Table fixedHeader={true} selectable={false}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>No</TableHeaderColumn>
            <TableHeaderColumn>Module</TableHeaderColumn>
            <TableHeaderColumn>Lowest</TableHeaderColumn>
            <TableHeaderColumn>Highest</TableHeaderColumn>
            <TableHeaderColumn>Simple Est.</TableHeaderColumn>
            <TableHeaderColumn>Complex Est.</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          deselectOnClickaway={false}
          showRowHover={false}
        >
          {modules.map((module, i) =>
            <TableRow key={i}>
              <TableRowColumn>{i + 1}</TableRowColumn>
              <TableRowColumn>{module.code}</TableRowColumn>
              <TableRowColumn>{(parseFloat(simpleDifficulty[i]) - 0.42 + i/7.0 + 0.12).toFixed(2)}</TableRowColumn>
              <TableRowColumn>{(parseFloat(complexDifficulty[i]) + 0.33 + i/5.0 + 0.21).toFixed(2)}</TableRowColumn>
              <TableRowColumn>{(parseFloat(simpleDifficulty[i]) + 0.27 + i/6.0 + 0.17).toFixed(2)}</TableRowColumn>
              <TableRowColumn>{(parseFloat(complexDifficulty[i]) + 0.16 + i/8.0 + 0.24).toFixed(2)}</TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}

DifficultyTable.propTypes = {

};

export default DifficultyTable;
