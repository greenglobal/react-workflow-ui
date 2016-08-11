'use strict';
import React from 'react';
import DraggableControl from '../../draggable';
let imgStart = require('../../../images/start.png');

class FlowControlStart extends DraggableControl {

  render() {
    return (
      <li className='list' data-type="flowcontrol-start" ref='control'>
        <div className='area-image'>
          <img className='image' src={imgStart} alt="image logo" />
        </div>
        <div className='area-content'>
          <h3 className='title'>
            <a className='link' href="#">Start</a>
          </h3>
        </div>
      </li>
    );
  }

}

export default FlowControlStart;
