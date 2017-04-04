import React, { Component, PropTypes } from 'react';
import { IconButton } from 'material-ui';
import ActionTimeline from 'material-ui/svg-icons/action/timeline';
import AvAvTimer from 'material-ui/svg-icons/av/av-timer';
import EditorFormatListNumbered from 'material-ui/svg-icons/editor/format-list-numbered';
import ActionEvent from 'material-ui/svg-icons/action/event';
import ActionDonutSmall from 'material-ui/svg-icons/action/donut-small';
import AvEqualizer from 'material-ui/svg-icons/av/equalizer';

import {
  changeWidget,
  WIDGET_TIME_TABLE,
  WIDGET_MODULE_TIME_TABLE,
  WIDGET_MODULE_TIME_LINE_CHART,
  WIDGET_MODULE_TIME_PIE_CHART,
  WIDGET_DIFFICULTY_TABLE,
  WIDGET_MODULE_TIME_BAR_CHART
} from '../actions/widget.js';

import '../stylesheets/WidgetTab.scss';

class WidgetTab extends Component {
  constructor(props) {
    super(props);

    this.handleChangeWidget = this.handleChangeWidget.bind(this);
  }

  handleChangeWidget(type) {
    const { dispatch } = this.props;

    dispatch(changeWidget(type));
  }

  render() {
    const { widget } = this.props;

    switch (widget.type) {
      case WIDGET_TIME_TABLE:
        return (
          <div className={widget.display ? 'widget-tab-container-selected' : 'widget-tab-container'}>
            <IconButton className="tab-button" tooltip="time table" tooltipPosition="bottom-right">
              <ActionEvent className={widget.display ? 'widget-tab-selected' : 'widget-tab'} onClick={() => this.handleChangeWidget(WIDGET_TIME_TABLE)} />
            </IconButton>
          </div>
        );

      case WIDGET_MODULE_TIME_TABLE:
        return (
          <div className={widget.display ? 'widget-tab-container-selected' : 'widget-tab-container'}>
            <IconButton className="tab-button" tooltip="weekly working time table" tooltipPosition="bottom-right">
              <AvAvTimer className={widget.display ? 'widget-tab-selected' : 'widget-tab'} onClick={() => this.handleChangeWidget(WIDGET_MODULE_TIME_TABLE)} />
            </IconButton>
          </div>
        );

      case WIDGET_MODULE_TIME_LINE_CHART:
        return (
          <div className={widget.display ? 'widget-tab-container-selected' : 'widget-tab-container'}>
            <IconButton className="tab-button" tooltip="weekly working time line chart" tooltipPosition="bottom-right">
              <ActionTimeline className={widget.display ? 'widget-tab-selected' : 'widget-tab'} onClick={() => this.handleChangeWidget(WIDGET_MODULE_TIME_LINE_CHART)} />
            </IconButton>
          </div>
        );

      case WIDGET_MODULE_TIME_PIE_CHART:
        return (
          <div className={widget.display ? 'widget-tab-container-selected' : 'widget-tab-container'}>
            <IconButton className="tab-button" tooltip="working time pie chart" tooltipPosition="bottom-right">
              <ActionDonutSmall className={widget.display ? 'widget-tab-selected' : 'widget-tab'} onClick={() => this.handleChangeWidget(WIDGET_MODULE_TIME_PIE_CHART)} />
            </IconButton>
          </div>
        );

      case WIDGET_DIFFICULTY_TABLE:
        return (
          <div className={widget.display ? 'widget-tab-container-selected' : 'widget-tab-container'}>
            <IconButton className="tab-button" tooltip="module difficulty table" tooltipPosition="bottom-right">
              <EditorFormatListNumbered className={widget.display ? 'widget-tab-selected' : 'widget-tab'} onClick={() => this.handleChangeWidget(WIDGET_DIFFICULTY_TABLE)} />
            </IconButton>
          </div>
        );

      case WIDGET_MODULE_TIME_BAR_CHART:
        return (
          <div className={widget.display ? 'widget-tab-container-selected' : 'widget-tab-container'}>
            <IconButton className="tab-button" tooltip="weekly working time bar chart" tooltipPosition="bottom-right">
              <AvEqualizer className={widget.display ? 'widget-tab-selected' : 'widget-tab'} onClick={() => this.handleChangeWidget(WIDGET_MODULE_TIME_BAR_CHART)} />
            </IconButton>
          </div>
        );

      default:
        return null;

    }
  }
}

WidgetTab.propTypes = {

};

export default WidgetTab;
