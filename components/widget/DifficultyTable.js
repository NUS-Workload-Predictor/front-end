import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, IconButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';

import { TRAINING_SERVER_URL } from '../../constants/constants';

const difficultyApi = TRAINING_SERVER_URL + '/workload/simple/difficulty/';

class DifficultyTable extends Component {
  constructor(props) {
    super(props);

    let difficulty = [];
    for (let i = 0; i < props.modules.length; i++) {
      difficulty.push(0.0);
    }
    this.state = { difficulty: difficulty };
  }

  getDifficultyParams(module) {
    let url = difficultyApi + module;
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

  getDifficulty(module, index) {
    let difficulty = 0.0;

    return this.getDifficultyParams(module.code).then((coefficients) => {
      if (Object.keys(coefficients).length === 0 && coefficients.constructor === Object) {
        difficulty = this.getDifficultyDefault(module);
      } else {
        difficulty = module.level * coefficients.level
          + module.mc * coefficients.mc
          + module.lecture * coefficients.lecture
          + module.tutorial * coefficients.tutorial
          + module.lab * coefficients.lab
          + module.project * coefficients.project
          + module.preparation * coefficients.preparation
          + coefficients.intercept;
      }

      difficulty = difficulty.toFixed(2);
      return difficulty;
    });
  }

  componentDidMount() {
    const { modules } = this.props;
    let difficultyList = [];

    modules.reduce((promise, module, index) => {
      return promise.then(() => {
        return this.getDifficulty(module, index).then((difficulty) => {
          difficultyList[index] = difficulty;
        });
      });
    }, Promise.resolve()).then(
      () => {
        this.setState({ difficulty: difficultyList });
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    const { modules } = nextProps;
    let difficultyList = [];

    modules.reduce((promise, module, index) => {
      return promise.then(() => {
        return this.getDifficulty(module, index).then((difficulty) => {
          difficultyList[index] = difficulty;
        });
      });
    }, Promise.resolve()).then(
      () => {
        this.setState({ difficulty: difficultyList });
      }
    );
  }

  render() {
    const { widget, modules } = this.props;
    const { difficulty } = this.state;

    return (
      <Table fixedHeader={true} selectable={false}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>No</TableHeaderColumn>
            <TableHeaderColumn>Module</TableHeaderColumn>
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
              <TableRowColumn>{difficulty[i]}</TableRowColumn>
              <TableRowColumn>{difficulty[i]}</TableRowColumn>
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
