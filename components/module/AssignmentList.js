import React, { Component, PropTypes } from 'react';

import Assignment from './Assignment';

class AssignmentList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Assignment />
      </div>
    );
  }
}

AssignmentList.propTypes = {

};

export default AssignmentList;
