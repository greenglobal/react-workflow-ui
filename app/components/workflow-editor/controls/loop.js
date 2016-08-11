'use strict';
import React from 'react';
import DraggableControl from '../../draggable';
let imgLoop = require('../../../images/loop-white.png');

class FlowControlLoop extends DraggableControl {

  render() {
    return (
      <li className='list' data-type="flowcontrol-loop" ref='control'>
        <div className='area-image'>
          <img className='image' src={imgLoop} alt="image logo" />
        </div>
        <div className='area-content'>
          <h3 className='title'>
            <a className='link' href="#">Loop</a>
          </h3>
        </div>
      </li>
    );
  }

}

export default FlowControlLoop;
