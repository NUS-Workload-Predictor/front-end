import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import { connect } from 'react-redux';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Widget from './Widget';
import { moveWidget } from '../actions/widget';

const styles = {
  width: '100%',
  height: '100%',
  border: '1px solid black',
  position: 'relative'
};

const testSpec = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    const { dispatch } = props;
    dispatch(moveWidget(item.index, top, left));
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class WidgetBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { connectDropTarget, widgets } = this.props;

    return connectDropTarget(
      // <div style={{paddingTop: '80px', paddingLeft: '20px'}}>
      <div style={styles}>
        {widgets.map((widget, i) => {
          return (
            <Widget
              key={i}
              index={i}
              widget={widget}
          />);
        })}
      </div>
    );
  }
}

WidgetBoard.propTypes = {

};

export default DragDropContext(HTML5Backend)(DropTarget('widget', testSpec, collect)(WidgetBoard));
