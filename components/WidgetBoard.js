import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import { connect } from 'react-redux';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Widget from './Widget';

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

    component.moveBox(item.id, left, top);
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
    this.state = {
      boxes: {
        'a': { top: 20, left: 80, title: 'Drag me around' },
        'b': { top: 180, left: 20, title: 'Drag me too' }
      }
    };
  }

  moveBox(id, left, top) {
    this.setState(update(this.state, {
      boxes: {
        [id]: {
          $merge: {
            left: left,
            top: top
          }
        }
      }
    }));
  }

  render() {
    const { hideSourceOnDrag, connectDropTarget } = this.props;
    const { boxes } = this.state;

    return connectDropTarget(
      // <div style={{paddingTop: '80px', paddingLeft: '20px'}}>
      <div style={styles}>
        {Object.keys(boxes).map(key => {
          const { left, top, title } = boxes[key];
          return (
            <Widget key={key}
                 id={key}
                 left={left}
                 top={top}
                 hideSourceOnDrag={hideSourceOnDrag}>
              {title}
            </Widget>
          );
        })}
      </div>
    );
  }
}

WidgetBoard.propTypes = {

};

export default DragDropContext(HTML5Backend)(DropTarget('widget', testSpec, collect)(WidgetBoard));
