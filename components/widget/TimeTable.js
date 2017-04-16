import React, { Component, PropTypes } from 'react';
import { IconButton } from 'material-ui';
import AvLibraryBooks from 'material-ui/svg-icons/av/library-books';

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

// const timeList = [
//   {
//     info: 'CS3245 Lecture',
//     day: 5,
//     // time: [10, 12]
//     time: [20, 24]
//   },
//   {
//     info: 'CS3245 Tutorial',
//     day: 2,
//     // time: [17, 18]
//     time: [34, 36]
//   },
//   {
//     info: 'CS4218 Lecture',
//     day: 2,
//     // time: [14, 16]
//     time: [28, 32]
//   },
//   {
//     info: 'CS4218 Lab',
//     day: 3,
//     // time: [11, 12]
//     time: [22, 24]
//   }
// ];

class TimeTable extends Component {
  constructor(props) {
    super(props);

    this.getTimeTableCells = this.getTimeTableCells.bind(this);
    this.getTimeTableRows = this.getTimeTableRows.bind(this);
  }

  getTimeTableRows(timeList) {
    let time = [[], [], [], [], []];
    timeList.map((t, i) => {
      if (t.day >= 1 && t.day <= 5) {
        for (let j = t.time[0]; j < t.time[1]; j++) {

          time[t.day - 1].push({
            info: t.info,
            time: j - 16
          });
        }
      }
    });

    let rows = [...Array(5)].map((_, i) => (
      <tr key={i}>
        {
          this.getTimeTableCells(time[i])
        }
      </tr>
    ));

    return rows;
  }

  getTimeTableCells(time) {
    time = time.sort((a, b) => (
      (a.time < b.time) ? -1 : (a.time > b.time) ? 1 : 0
    ));
    let current = 0;
    let cells = [...Array(32)].map((_, i) => {
      if (current < time.length && i === time[current].time) {
        let temp = current;
        current += 1;

        return (
          <td key={i} className="half-hour-block occupied">
            <IconButton tooltip={time[temp].info} touch={true} tooltipPosition="bottom-center">
              <AvLibraryBooks />
            </IconButton>
          </td>
        );
      } else {
        return (
          <td key={i} className="half-hour-block"></td>
        );
      }
    });

    return cells
  }

  render() {
    const { widget, timeTable } = this.props;
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
                  this.getTimeTableRows(timeTable)
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
