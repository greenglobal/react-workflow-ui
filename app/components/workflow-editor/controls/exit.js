'use strict';
import React from 'react';
import DraggableControl from '../../draggable';
let imgExit = require('../../../images/exit.png');

class FlowControlExit extends DraggableControl {

  render() {
    return (
      <li className='list' data-type="flowcontrol-end" ref='control'>
        <div className='area-image'>
          <img className='image' src={imgExit} alt="image logo" />
        </div>
        <div className='area-content'>
          <h3 className='title'>
            <a className='link' href="#">Exit</a>
          </h3>
        </div>
      </li>
    );
  }
}

export default FlowControlExit;
