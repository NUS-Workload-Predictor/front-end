import React, { Component, PropTypes } from 'react';

import '../../stylesheets/widget/TimeTable.scss';

const time = [
  '08', '10',
  '12', '14',
  '16', '18',
  '20', '22'
];

const day = [
  'MON', 'TUE', 'WED', 'THU', 'FRI'
];

class TimeTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { widget } = this.props;
    const { width, height } = widget;

    return (
      <div id="time-table-container">
        {/* <div id="time-line">
          {time.map((t, i) => (<span key={i}>{t}</span>))}
        </div> */}
        <div id="table-vertical-bar-container">
          <div id="vertical-bar">
            <div className="week-day">&nbsp;&nbsp;&nbsp;</div>
            {day.map((d, i) => (<div className="week-day" key={i}>{d}</div>))}
          </div>
          <div id="table-container">
            <table>
              <thead>
                <tr>
                  {
                    [...Array(48)].map((_, i) => (
                      i  < 16 ? null : (
                        i % 2 === 0 ? (
                          <th className="time-point" key={i}>{i / 2}</th>
                        ) : (
                          <th key={i}></th>
                        )
                      )
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      {
                        [...Array(32)].map((_, i) => (
                          <td key={i} className="half-hour-block"></td>
                        ))
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

TimeTable.propTypes = {

};

export default TimeTable;
