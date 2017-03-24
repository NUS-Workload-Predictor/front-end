import React, { Component, PropTypes } from 'react';
import ActionTimeline from 'material-ui/svg-icons/action/timeline';
import AvAvTimer from 'material-ui/svg-icons/av/av-timer';
import EditorFormatListNumbered from 'material-ui/svg-icons/editor/format-list-numbered';
import ActionEvent from 'material-ui/svg-icons/action/event';

import { changeWidget, WIDGET_TIME_TABLE, WIDGET_MODULE_TIME_TABLE, WIDGET_MODULE_TIME_LINE_CHART, WIDGET_DIFFICULTY_TABLE } from '../actions/widget.js';

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
            <ActionEvent className={widget.display ? 'widget-tab-selected' : 'widget-tab'} onClick={() => this.handleChangeWidget(WIDGET_TIME_TABLE)} />
          </div>
        );

      case WIDGET_MODULE_TIME_TABLE:
        return (
          <div className={widget.display ? 'widget-tab-container-selected' : 'widget-tab-container'}>
            <AvAvTimer className={widget.display ? 'widget-tab-selected' : 'widget-tab'} onClick={() => this.handleChangeWidget(WIDGET_MODULE_TIME_TABLE)} />
          </div>
        );

      case WIDGET_MODULE_TIME_LINE_CHART:
        return (
          <div className={widget.display ? 'widget-tab-container-selected' : 'widget-tab-container'}>
            <ActionTimeline className={widget.display ? 'widget-tab-selected' : 'widget-tab'} onClick={() => this.handleChangeWidget(WIDGET_MODULE_TIME_LINE_CHART)} />
          </div>
        );

      case WIDGET_DIFFICULTY_TABLE:
        return (
          <div className={widget.display ? 'widget-tab-container-selected' : 'widget-tab-container'}>
            <EditorFormatListNumbered className={widget.display ? 'widget-tab-selected' : 'widget-tab'} onClick={() => this.handleChangeWidget(WIDGET_DIFFICULTY_TABLE)} />
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
